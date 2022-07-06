export let user_info = {
  company_name: "",
  business_sector: "", // String should be dropdown/searchbox
  employee_count: 0, // positive integer
  company_location: "", // String
  contact_name: "", // String
  contact_job_title: "", // String
  contact_email: "", // Email type
  contact_telephone: "" // phone number type with ext
};

export let errors = {
  company_name: "",
  business_sector: "", // String should be dropdown/searchbox
  employee_count: 0, // positive integer
  company_location: "", // String
  contact_name: "", // String
  contact_job_title: "", // String
  contact_email: "", // Email type
  contact_telephone: "" // phone number type with ext
};

export let categories = [
  {
    subID: 1,
    subName: "Legal Compliance",
    sub_category: "legal_compliance",
    questions: [
      {
        answer: "",
        question:
          "1. Do you have a process in place to ensure that all employees have the right to work in Ireland?"
      },
      {
        answer: "",
        question:
          "2. Do all of your employees have a contract providing written terms and conditions of their employment?"
      },
      {
        answer: "",
        question:
          "3. Do you issue an addendum for any changes in employment terms and conditions? Wage changes, hours of work, etc?"
      },
      {
        answer: "",
        question:
          "4. Do you ensure that you do not indirectly discriminate through poor recruitment and selection procedures, and pay and incentive schemes?"
      }
    ]
  },

  {
    subID: 2,
    subName: "Hours of Work and Leave",
    sub_category: "work_n_leaves",
    questions: [
      {
        answer: "",
        question:
          "1. Do Your employees receive breaks in line with Working Time Regulations?"
      },
      {
        answer: "",
        question:
          "2. Do all of your employees receive at least their statutory minimum holidays and public holiday entitlements?"
      },
      {
        answer: "",
        question:
          "3. Are you complying with maternity, paternity, parental and other statutory leave rights for your employees?"
      },
      {
        answer: "",
        question:
          "4. Do you keep an accurate record of each employees working hours including rest breaks?"
      }
    ]
  },

  {
    subID: 3,
    subName: "Policies & Practices",
    sub_category: "policies_n_practices",
    questions: [
      {
        answer: "",
        question:
          "1. Do you have a set of clear and comprehensive employment policies (Employee Handbook) in place that is accessible to managers and employees?"
      },
      {
        answer: "",
        question:
          "2. Do you feel confident about responding to a request for flexible working?"
      },
      {
        answer: "",
        question:
          "3. Are staff and managers aware of how to recognise and deal with bullying and harassment?"
      },
      {
        answer: "",
        question:
          "4. Do you have adequate policies in place to protect your business such as social media policies, confidentiality agreements, intellectual property and restrictive covenants?"
      },
      {
        answer: "",
        question: "5. Do you have a written equal opportunities policy?"
      }
    ]
  },

  {
    subID: 4,
    subName: "Employee Relations",
    sub_category: "employee_reactions",
    questions: [
      {
        answer: "",
        question:
          "1. Are you and your managers well equipped to handle an employee dispute, grievance or disciplinary situation?"
      },
      {
        answer: "",
        question:
          "2. Are you and your managers well equipped to discuss difficult topics with employees? (E.G sickness absence, poor performance)"
      },
      {
        answer: "",
        question: "3. Do you have to deal with a lot of employee grievances?"
      }
    ]
  },

  {
    subID: 5,
    subName: "Performance Management",
    sub_category: "performance_management",
    questions: [
      {
        answer: "",
        question:
          "1. Do all employees have job descriptions and clearly defined roles?"
      },
      {
        answer: "",
        question:
          "2. Do you have a process for objectively assessing the performance of your employees?"
      },
      {
        answer: "",
        question: "3. Do you provide frequent feedback to your employees?"
      },
      {
        answer: "",
        question:
          "4. Do you manage an employee’s probationary period effectively with regular check ins and feedback?"
      },
      {
        answer: "",
        question:
          "5. Do you have a persistent or long-term sickness absence problem within your business?"
      },
      {
        answer: "",
        question:
          "6. Are you dealing with a lot of disciplinaries within your business?"
      }
    ]
  },

  {
    subID: 6,
    subName: "Training and Development",
    sub_category: "training_n_dev",
    questions: [
      {
        answer: "",
        question:
          "1. Do you have a method to identify the skills gaps and development needs of your workforce?"
      },
      {
        answer: "",
        question:
          "2. Have your line managers been trained to deal with people issues?"
      }
    ]
  },

  {
    subID: 7,
    subName: "Recruitment & Retention",
    sub_category: "recruit_n_retain",
    questions: [
      {
        answer: "",
        question: "1. Do you have high staff turnover rates?"
      },
      {
        answer: "",
        question:
          "2. Are you clear about why employees have left your business?"
      },
      {
        answer: "",
        question:
          "3. Do you gain enough quality candidates through your recruitment methods?"
      },
      {
        answer: "",
        question:
          "4. Are you and your managers trained in interviewing and selection techniques?"
      },
      {
        answer: "",
        question: "5. Do you have a structured onboarding process?"
      }
    ]
  },

  {
    subID: 8,
    subName: "Change and Reorganisation",
    sub_category: "change_n_reorganise",
    questions: [
      {
        answer: "",
        question:
          "1. Are you aware of the employment law implications of handling a business re-organisation?"
      },
      {
        answer: "",
        question:
          "2. Do you have strong policies in place to manage a downturn in the business and potential redundancies?"
      }
    ]
  },

  {
    subID: 9,
    subName: "Pay and Benefits",
    sub_category: "pay_n_benefits",
    questions: [
      {
        answer: "",
        question:
          "1. Do you have a process for assessing and reviewing the salary and other benefits of your employees?"
      },
      {
        answer: "",
        question:
          "2. Do your employees receive a statement of earnings? (Payslip)"
      },
      {
        answer: "",
        question:
          "3. Do you meet legal requirements such as the National Minimum Wage and equal pay?"
      },
      {
        answer: "",
        question: "4. Do all of your employees have access to a PRSA?"
      },
      {
        answer: "",
        question:
          "5. Do you ensure that you do not discriminate through your pay and incentive schemes?"
      }
    ]
  },

  {
    subID: 10,
    subName: "Employee Communication & Engagement",
    sub_category: "employee_communication",
    questions: [
      {
        answer: "",
        question: "1. Do you conduct a regular employee engagement survey?"
      },
      {
        answer: "",
        question:
          "2. Do you keep employees informed about business developments? (e.g. financial performance, forthcoming changes)"
      },
      {
        answer: "",
        question:
          "3. Do you communicate with all of your employees regularly and allow for their input/contribution?"
      }
    ]
  },

  {
    subID: 11,
    subName: "Health and Safety",
    sub_category: "health_n_safety",
    questions: [
      {
        answer: "",
        question:
          "1. Does your business have a health and safety policy and statement that is visible to all employees and reviewed annually?"
      },
      {
        answer: "",
        question:
          "2. Are workplace accidents, near-misses, injuries, and illnesses reported and investigated?"
      },
      {
        answer: "",
        question:
          "3. Do you ensure that you are looking after the employees mental as well as physical health?"
      }
    ]
  },

  {
    subID: 12,
    subName: "Covid Related",
    sub_category: "covid_related",
    questions: [
      {
        answer: "",
        question:
          "1. Have all of your staff been through the Return-to-Work Covid Induction?"
      },
      {
        answer: "",
        question:
          "2. Have you at least one Lead Worker Representative appointed?"
      },
      {
        answer: "",
        question:
          "3. Have risk assessments been carried out on homework stations for employees working remotely?"
      }
    ]
  },

  {
    subID: 13,
    subName: "Employee Records and GDPR",
    sub_category: "records_n_GDPR",
    questions: [
      {
        answer: "",
        question:
          "1. Do you have a Data Protection Policy that is compliant with the Data Protection Act 2018?"
      },
      {
        answer: "",
        question:
          "2. Do you have complete and up to date files of record on every employee?"
      },
      {
        answer: "",
        question:
          "3. Are you only retaining records for as long as you should and securely destroying any data no longer required?"
      }
    ]
  }
];
