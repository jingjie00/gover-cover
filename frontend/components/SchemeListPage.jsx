import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import Cookies from 'js-cookie';

const initialSchemes = [
  {
    title: 'Student Incentive Support',
    description:
      'Top-up RM500 voucher for students eligible under the government scheme.',
    details:
      'This scheme provides an additional RM500 voucher to students who are already benefiting from the government’s incentive program. Eligible students can use this voucher for educational resources and supplies.',
    buttonText: 'Apply Now',
    image: 'https://cdn.eduadvisor.my/articles/2021/11/malaysia-budget-2022-tvet.png',
  },
  {
    title: 'SME Growth Plan Subsidy',
    description:
      'Additional RM2000 support for SMEs under the government’s growth plan.',
    details:
      'Small and Medium Enterprises (SMEs) that are eligible for the government’s growth plan can receive an extra RM2000 grant to boost business operations, covering digital transformation and workforce development.',
    buttonText: 'Get Support',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8oM4ks5Ald2Ev6CvhYD6OIj_UBMf7fwop9g&s',
  },
  {
    title: 'Healthcare Assistance',
    description:
      'Get RM1000 support for health-related expenses under this scheme.',
    details:
      'Healthcare providers and eligible patients can claim an additional RM1000 in support under this scheme. The funds can be used to cover medical supplies, consultations, and essential treatments.',
    buttonText: 'Apply Now',
    image: 'https://aimst.edu.my/wp-content/uploads/2019/04/20546-160G91sddf345.jpg',
  },
  {
    title: 'Youth Business Support',
    description:
      'RM3000 subsidy for businesses hiring local youth under the employment initiative.',
    details:
      'This program incentivizes businesses to hire local youth by providing a one-time subsidy of RM3000 per eligible hire. The funds can be used to cover training and onboarding expenses.',
    buttonText: 'Get Funding',
    image: 'https://www.wikiimpact.com/wp-content/uploads/2021/04/youth-employment.jpg',
  },
  {
    title: 'Digital Business Transformation',
    description: 'Up to RM5000 in support for SMEs adopting digital tools.',
    details:
      'This scheme offers financial support to SMEs that are transitioning to digital operations. Eligible businesses can receive up to RM5000 for purchasing software, hardware, or training staff in digital skills.',
    buttonText: 'Learn More',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIW5pe_uzRgmAmY17BqDFU-_5PB1XB7rHSqA&s',
  },
  {
    title: 'Women-Led Business Fund',
    description: 'RM2000 fund for women entrepreneurs and startups.',
    details:
      'Women-led businesses can apply for this scheme, which offers a RM2000 grant for new and existing ventures. The funds can be used for business expansion, marketing, or operational needs.',
    buttonText: 'Apply Now',
    image: 'https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1636262096/1636262095.jpg',
  },
];

function SchemeListPage() {
  const router = useRouter();
  const [schemes, setSchemes] = useState(initialSchemes);
  const [showDetails, setShowDetails] = useState(Array(initialSchemes.length).fill(false));

  const addRecord = useSelector((state) => state.setting.addRecord);

  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 1000 });
    dispatch(SettingActions.setLoading(false));
  }, []);

  useEffect(() => {
    if (Cookies.get('addRecord')) {
      setSchemes((prevSchemes) => [
        ...prevSchemes,
        {
          title: 'B40 Student Smart Tablet Scheme',
          description: 'Free smart tablets for the first 1000 successful B40 incentive applicants.',
          details: 'Sponsored by Soh Huang Siah.',
          buttonText: 'Apply Now',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo64deVgE_ewhW2emAT43liRQGB_cq7s1TA&s',
        },
      ]);
    }
  }, [Cookies.get('addRecord')]);

  const toggleDetails = (index) => {
    setShowDetails((prev) => {
      const newShowDetails = [...prev];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };

  return (
    <Layout>
      <div className='text-xl flex flex-col justify-center align-center items-center my-10'>
        <div className='w-3/4 my-2'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className='project-card shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105'
              >
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  className='project-image object-cover w-full h-48'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{scheme.title}</h3>
                  <p className='text-gray-700 mt-2'>{scheme.description}</p>
                  <div className='button-group flex justify-between mt-4'>
                    <Button type='primary' onClick={() => toggleDetails(index)}>
                      {showDetails[index] ? 'Hide Details' : 'View Details'}
                    </Button>
                    <Button type='default' onClick={() => router.push('/apply')}>
                      {scheme.buttonText}
                    </Button>
                  </div>
                  {showDetails[index] && (
                    <div className='details mt-4 p-2 border-t border-gray-200'>
                      <p className='text-gray-600'>{scheme.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SchemeListPage;