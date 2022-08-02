from rest_framework import viewsets, status
from rest_framework.response import Response
from annoying.functions import get_object_or_None
from collections import OrderedDict
from django.http import HttpResponse
# import plotly.graph_objects as go
from django.template.loader import render_to_string, get_template
from django.core.files import File
import pdfkit
import numpy as np
import statistics
import math
import os
import json
from django.conf import settings


from survey_api import models as survey_models, serializers as survey_serializers


class SurveyViewset(viewsets.ModelViewSet):
    """Customer info API Viewset"""

    queryset = survey_models.CustomerInfo.objects.all()

    serializer_class = survey_serializers.InfoSerializer

    def list(self, request):

        cust_list = survey_models.CustomerInfo.objects.all()
        list_serializer = survey_serializers.InfoSerializer(cust_list, many=True)
        return Response({"Customers": list_serializer.data}, status=status.HTTP_200_OK)

    def create(self, request):
        """Create a user in the db when visiting for the first time"""
        print(request.data)
        customer_info = request.data['cust_info']
        instance = get_object_or_None(survey_models.CustomerInfo, contact_email=customer_info['contact_email'])
        if instance==None:
            info_serializer = survey_serializers.InfoSerializer(data=customer_info)
            saved_cust = None

            if info_serializer.is_valid():
                saved_cust = info_serializer.save()
            return Response({"cust_id": saved_cust.id, "message": "Customer created Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"cust_id": instance.id, "message": "Customer already in db"}, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None):

        survey_subsections = []
        survey_response = []
        subsec_title = []
        print("Update Request", request.data)

        email_address = request.data['contact_email']
        instance = survey_models.CustomerSurvey.objects.filter(survey_user__contact_email=email_address).first()
        if not instance or not instance.id == int(pk):
            return Response({"message": "Customer details not found"}, status=status.HTTP_404_NOT_FOUND)
        for sub_sec in request.data['survey_response']:
            sec_scores = [int(response['answer']) if response['answer'] else 0 for response in sub_sec['questions']]
            setattr(instance, sub_sec['sub_category'], math.floor(statistics.mean(sec_scores)))
            subsec_title.append(sub_sec['subName'])
            survey_subsections.append(sub_sec['sub_category'])

        customer_info_dict = survey_serializers.InfoSerializer(instance.survey_user).data.copy()
        customer_info_dict.pop('id')

        customer_survey_dict = instance.__dict__.copy()
        for key in ['_state', 'survey_user_id', 'id']:
            customer_survey_dict.pop(key)

        key_val_list = list(customer_info_dict.items())
        customer_info_dict.clear()

        for key, value in key_val_list :
            new_key = " ".join(key.split("_")).title()
            customer_info_dict[new_key] = value
        customer_info_dict.pop("Pdf Report")

        survey_key_val_list = list(customer_survey_dict.items())
        customer_survey_dict.clear()

        for title, (key, value) in zip(subsec_title, survey_key_val_list) :
            customer_survey_dict[title] = value
        
        config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
        html_string = render_to_string('report_gen_template.html', {'customer_info': customer_info_dict, 
                                        'survey_response': customer_survey_dict,
                                        })
        f = open('output.html', 'w+')
        f.write(html_string)
        f.close()
        # html_template = get_template('invoice.html')
        # html = html_template.render({'customer_info': customer_info_dict, 
        #                                 'survey_response': customer_survey_dict,
        #                                  'js_survey': json.dumps(customer_survey_dict)
        #                                 })

        pdf_model_filename = 'report_{}_{}.pdf'.format(email_address.split('@')[0], instance.id)

        _, _, filenames = next(os.walk(f'{settings.MEDIA_ROOT}/pdf/'))
        print(filenames)
        if pdf_model_filename in filenames:
            os.remove(f'{settings.MEDIA_ROOT}/pdf/{pdf_model_filename}')
        
        pdfkit.from_string(html_string, 'output.pdf',configuration=config)
        f = open('output.pdf', mode='rb')
        myFile = File(f)
        instance.survey_user.pdf_report.save(pdf_model_filename, myFile)
        f.close()


        os.remove('output.pdf')
        os.remove('output.html')
        
        # setattr(instance, 'legal_compliance', 2)
        # response_categories = OrderedDict()

        # response_categories[1] = ['Red', 'rgba(187, 30, 16, 1)', 'rgba(187, 30, 16, 0.3)']
        # response_categories[2] = ['Amber', 'rgba(247, 181, 0, 1)', 'rgba(247, 181, 0, 0.3)']
        # response_categories[3] = ['Green', 'rgba(0, 131, 81, 1)', 'rgba(0, 131, 81, 0.3)']


        # fig = go.Figure()
        # survey_response = [getattr(instance, field) for field in survey_subsections]
        # survey_subsections.reverse()

        # for key, values in response_categories.items():
        #     fig.add_trace(go.Bar(
        #     y=survey_subsections,
        #     x=np.ones(len(survey_subsections)),
        #     name= values[0],
        #     orientation='h',
        #     marker=dict(
        #         color=[values[1] if x==key else values[2] for x in survey_response],
        #         )))

        # fig.update_layout(xaxis={'visible': False, 'showticklabels': False})
        # fig.update_layout({'plot_bgcolor': 'rgba(0, 0, 0, 0)', 'paper_bgcolor': 'rgba(0, 0, 0, 0)',})
        # fig.update_layout(barmode='stack')
        # # fig.show(config={'staticPlot': True})


        # plotly.io.write_image(fig, 'output_file.pdf', format='pdf')
        instance.save()
        return Response({"message": "Customer survey response updated"}, status=status.HTTP_200_OK)

    def retrieve(self, request, pk = None):
        # email_address = request.data['contact_email']
        email_address = request.GET.get('contact_email', '')
        instance = survey_models.CustomerSurvey.objects.filter(survey_user__contact_email=email_address).first()
        if not instance or not instance.id == int(pk):
            return Response({"message": "Customer details not found"}, status=status.HTTP_404_NOT_FOUND)
        customer_obj = survey_serializers.InfoSerializer(instance.survey_user)
        pdf_cust_name = email_address.split('@')[0]
        file_path = f'{settings.MEDIA_ROOT}/pdf/report_{pdf_cust_name}_{pk}.pdf'
        data = None
        with open(file_path, 'rb') as file:
            data = file.read()

        response = HttpResponse(data, content_type='application/pdf')
        return response
        # return Response({"message": "Customer found"}, status=status.HTTP_200_OK)





        