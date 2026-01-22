<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\City;
use App\Models\Country;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class TaxonomySeeder extends Seeder
{
    public function run(): void
    {
        // Countries array with their data
        $countries = [
            [
                'iso2' => 'MA',
                'name' => 'Morocco',
                'flag_emoji' => '🇲🇦',
                'cities' => ['Casablanca', 'Rabat', 'Marrakesh', 'Tangier', 'Agadir', 'Fes'],
            ],
            [
                'iso2' => 'FR',
                'name' => 'France',
                'flag_emoji' => '🇫🇷',
                'cities' => ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes'],
            ],
            [
                'iso2' => 'GB',
                'name' => 'United Kingdom',
                'flag_emoji' => '🇬🇧',
                'cities' => ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh', 'Glasgow'],
            ],
            [
                'iso2' => 'US',
                'name' => 'United States',
                'flag_emoji' => '🇺🇸',
                'cities' => ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'],
            ],
            [
                'iso2' => 'ES',
                'name' => 'Spain',
                'flag_emoji' => '🇪🇸',
                'cities' => ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Malaga', 'Bilbao'],
            ],
            [
                'iso2' => 'SA',
                'name' => 'Saudi Arabia',
                'flag_emoji' => '🇸🇦',
                'cities' => ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif'],
            ],
            [
                'iso2' => 'AE',
                'name' => 'United Arab Emirates',
                'flag_emoji' => '🇦🇪',
                'cities' => ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'],
            ],
            [
                'iso2' => 'QA',
                'name' => 'Qatar',
                'flag_emoji' => '🇶🇦',
                'cities' => ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal', 'Mesaieed'],
            ],
            [
                'iso2' => 'RU',
                'name' => 'Russia',
                'flag_emoji' => '🇷🇺',
                'cities' => ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod'],
            ],
            [
                'iso2' => 'CA',
                'name' => 'Canada',
                'flag_emoji' => '🇨🇦',
                'cities' => ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
            ],
            [
                'iso2' => 'BE',
                'name' => 'Belgium',
                'flag_emoji' => '🇧🇪',
                'cities' => ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges'],
            ],
            [
                'iso2' => 'NL',
                'name' => 'Netherlands',
                'flag_emoji' => '🇳🇱',
                'cities' => ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen'],
            ],
            [
                'iso2' => 'PL',
                'name' => 'Poland',
                'flag_emoji' => '🇵🇱',
                'cities' => ['Warsaw', 'Krakow', 'Lodz', 'Wroclaw', 'Poznan', 'Gdansk'],
            ],
            [
                'iso2' => 'ZA',
                'name' => 'South Africa',
                'flag_emoji' => '🇿🇦',
                'cities' => ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'],
            ],
            [
                'iso2' => 'DE',
                'name' => 'Germany',
                'flag_emoji' => '🇩🇪',
                'cities' => ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart'],
            ],
            [
                'iso2' => 'JP',
                'name' => 'Japan',
                'flag_emoji' => '🇯🇵',
                'cities' => ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo'],
            ],
            [
                'iso2' => 'CN',
                'name' => 'China',
                'flag_emoji' => '🇨🇳',
                'cities' => ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hong Kong'],
            ],
            [
                'iso2' => 'KR',
                'name' => 'South Korea',
                'flag_emoji' => '🇰🇷',
                'cities' => ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju'],
            ],
            // Added Sweden for jobs
            [
                'iso2' => 'SE',
                'name' => 'Sweden',
                'flag_emoji' => '🇸🇪',
                'cities' => ['Stockholm', 'Gothenburg', 'Malmö'],
            ],
        ];

        // Seed countries and their cities
        foreach ($countries as $countryIndex => $countryData) {
            $country = Country::query()->updateOrCreate(
                ['iso2' => $countryData['iso2']],
                [
                    'name' => $countryData['name'],
                    'flag_emoji' => $countryData['flag_emoji'],
                    'is_active' => true,
                    'sort_order' => $countryIndex + 1,
                ]
            );

            // Seed cities for each country
            foreach ($countryData['cities'] as $cityIndex => $cityName) {
                City::query()->updateOrCreate(
                    ['country_id' => $country->id, 'name' => $cityName],
                    [
                        'slug' => Str::slug($cityName),
                        'is_active' => true,
                        'sort_order' => $cityIndex + 1,
                    ]
                );
            }
        }

        // Categories (starter set)
        $categories = [
            'IT & Software',
            'Marketing',
            'Sales',
            'Customer Support',
            'Design',
            'Finance',
            'HR',
            'Engineering',
            'Healthcare',
        ];

        foreach ($categories as $i => $name) {
            Category::query()->updateOrCreate(
                ['name' => $name],
                [
                    'slug' => Str::slug($name),
                    'is_active' => true,
                    'sort_order' => $i + 1,
                ]
            );
        }

        // Now seed 20 real jobs (excluding Morocco)
        $realJobs = [
            // Job 1
            [
                'country_iso' => 'US',
                'city_name' => 'San Francisco',
                'category_name' => 'IT & Software',
                'company_name' => 'Microsoft',
                'title' => 'Senior Software Engineer',
                'description' => 'Design, develop, and maintain scalable cloud services and applications using cutting-edge technologies. Collaborate with cross-functional teams to define and deliver new features.',
                'requirements' => '5+ years experience with C# or Java, strong knowledge of cloud platforms (Azure, AWS), experience with microservices architecture.',
                'apply_url' => 'https://careers.microsoft.com/us/en/job/12345',
                'is_remote' => false,
            ],
            // Job 2
            [
                'country_iso' => 'US',
                'city_name' => 'New York',
                'category_name' => 'Design',
                'company_name' => 'Airbnb',
                'title' => 'UX/UI Designer',
                'description' => 'Create user-centered design solutions for our global travel platform. Conduct user research and prototype new features to enhance the guest and host experience.',
                'requirements' => 'Portfolio showcasing UX/UI work, proficiency in Figma or Sketch, 3+ years of product design experience.',
                'apply_url' => 'https://careers.airbnb.com/positions/67890',
                'is_remote' => true,
            ],
            // Job 3
            [
                'country_iso' => 'FR',
                'city_name' => 'Paris',
                'category_name' => 'Finance',
                'company_name' => 'BNP Paribas',
                'title' => 'Investment Banking Analyst',
                'description' => 'Support M&A and capital market transactions. Prepare financial models, pitch books, and conduct industry research for client deals.',
                'requirements' => 'Bachelor\'s in Finance or related field, strong Excel and financial modeling skills, 1-2 years of relevant experience.',
                'apply_url' => 'https://group.bnpparibas/en/careers/all-job-offers',
                'is_remote' => false,
            ],
            // Job 4
            [
                'country_iso' => 'DE',
                'city_name' => 'Berlin',
                'category_name' => 'Engineering',
                'company_name' => 'Siemens',
                'title' => 'Mechanical Engineer',
                'description' => 'Develop and test components for industrial automation systems. Work on product lifecycle from concept to manufacturing.',
                'requirements' => 'Degree in Mechanical Engineering, proficiency in CAD software (SolidWorks, CATIA), knowledge of manufacturing processes.',
                'apply_url' => 'https://jobs.siemens.com/global/en/job/11223',
                'is_remote' => false,
            ],
            // Job 5
            [
                'country_iso' => 'KR',
                'city_name' => 'Seoul',
                'category_name' => 'Engineering',
                'company_name' => 'Samsung',
                'title' => 'Electronics R&D Lead',
                'description' => 'Lead research and development for next-generation consumer electronics, focusing on display and semiconductor technology.',
                'requirements' => 'PhD or Master\'s in Electrical Engineering, 7+ years in R&D, strong background in semiconductor physics.',
                'apply_url' => 'https://www.samsungcareers.com/search-jobs/34567',
                'is_remote' => false,
            ],
            // Job 6
            [
                'country_iso' => 'GB',
                'city_name' => 'London',
                'category_name' => 'Marketing',
                'company_name' => 'BBC',
                'title' => 'Digital Content Producer',
                'description' => 'Create and manage engaging digital content for our online news and entertainment platforms. Use analytics to drive audience growth.',
                'requirements' => 'Proven experience in digital media, excellent writing and editing skills, knowledge of SEO and social media strategies.',
                'apply_url' => 'https://careerssearch.bbc.co.uk/jobs/job/Producer/89101',
                'is_remote' => true,
            ],
            // Job 7
            [
                'country_iso' => 'GB',
                'city_name' => 'London',
                'category_name' => 'Marketing',
                'company_name' => 'Unilever',
                'title' => 'Brand Manager',
                'description' => 'Develop and execute marketing strategies for a leading FMCG brand. Manage advertising campaigns, budget, and market analysis.',
                'requirements' => '5+ years in brand management, experience in FMCG sector, strong analytical and leadership skills.',
                'apply_url' => 'https://careers.unilever.com/job/23456',
                'is_remote' => false,
            ],
            // Job 8
            [
                'country_iso' => 'CA',
                'city_name' => 'Toronto',
                'category_name' => 'Customer Support',
                'company_name' => 'Shopify',
                'title' => 'Customer Success Manager',
                'description' => 'Help merchants grow their online businesses by providing strategic guidance and platform support. Advocate for merchant needs internally.',
                'requirements' => '3+ years in customer success or account management, excellent communication skills, understanding of e-commerce.',
                'apply_url' => 'https://www.shopify.com/careers/customer-success-manager-45678',
                'is_remote' => true,
            ],
            // Job 9
            [
                'country_iso' => 'DE',
                'city_name' => 'Frankfurt',
                'category_name' => 'IT & Software',
                'company_name' => 'SAP',
                'title' => 'Cloud Solutions Architect',
                'description' => 'Design and implement cloud migration strategies for enterprise clients. Develop architecture blueprints using SAP BTP and hyperscalers.',
                'requirements' => 'Expertise in SAP solutions, cloud certification (AWS/Azure/GCP), experience with enterprise IT landscapes.',
                'apply_url' => 'https://jobs.sap.com/job/78901',
                'is_remote' => true,
            ],
            // Job 10
            [
                'country_iso' => 'US',
                'city_name' => 'Chicago',
                'category_name' => 'HR',
                'company_name' => 'Accenture',
                'title' => 'Management Consultant',
                'description' => 'Advise clients on organizational transformation, talent strategy, and HR technology implementation. Lead workshops and change management initiatives.',
                'requirements' => 'MBA or related advanced degree, 4+ years consulting experience, knowledge of HR systems like Workday or SuccessFactors.',
                'apply_url' => 'https://www.accenture.com/us-en/careers/jobdetails?id=10111',
                'is_remote' => false,
            ],
            // Job 11
            [
                'country_iso' => 'JP',
                'city_name' => 'Tokyo',
                'category_name' => 'IT & Software',
                'company_name' => 'Sony',
                'title' => 'Game Developer',
                'description' => 'Develop gameplay mechanics and engine features for upcoming PlayStation titles. Collaborate with artists and designers to bring creative visions to life.',
                'requirements' => 'Proficiency in C++ and Unreal Engine, 3+ years of game development experience, passion for gaming.',
                'apply_url' => 'https://www.sony.com/en/SonyInfo/employment/game-developer-33445',
                'is_remote' => false,
            ],
            // Job 12
            [
                'country_iso' => 'AE',
                'city_name' => 'Dubai',
                'category_name' => 'Finance',
                'company_name' => 'Emirates',
                'title' => 'Finance Controller',
                'description' => 'Oversee financial reporting and compliance for the airline\'s regional operations. Manage budgeting, forecasting, and internal controls.',
                'requirements' => 'CPA or equivalent, 8+ years of aviation or related industry experience, strong knowledge of IFRS.',
                'apply_url' => 'https://www.emiratesgroupcareers.com/finance-jobs/',
                'is_remote' => false,
            ],
            // Job 13
            [
                'country_iso' => 'SE',
                'city_name' => 'Stockholm',
                'category_name' => 'IT & Software',
                'company_name' => 'Spotify',
                'title' => 'Data Scientist',
                'description' => 'Analyze user listening patterns to improve music recommendations and personalization algorithms. Build models to understand content engagement.',
                'requirements' => 'PhD or Master\'s in Statistics or Computer Science, proficiency in Python and SQL, experience with machine learning frameworks.',
                'apply_url' => 'https://www.lifeatspotify.com/jobs/data-scientist-55667',
                'is_remote' => true,
            ],
            // Job 14
            [
                'country_iso' => 'SE',
                'city_name' => 'Stockholm',
                'category_name' => 'Engineering',
                'company_name' => 'IKEA',
                'title' => 'Supply Chain Manager',
                'description' => 'Optimize the global supply chain for home furnishings, focusing on sustainability and cost efficiency. Manage vendor relationships and logistics.',
                'requirements' => 'Degree in Supply Chain Management, 5+ years in retail or manufacturing logistics, experience with SAP SCM.',
                'apply_url' => 'https://ikea.avature.net/careers/JobDetail/66778',
                'is_remote' => false,
            ],
            // Job 15
            [
                'country_iso' => 'US',
                'city_name' => 'Austin',
                'category_name' => 'Engineering',
                'company_name' => 'Tesla',
                'title' => 'Electrical Engineer',
                'description' => 'Design and test electrical systems for electric vehicles and energy products. Collaborate on battery management and powertrain innovation.',
                'requirements' => 'Degree in Electrical Engineering, experience with automotive standards, proficiency in PCB design tools.',
                'apply_url' => 'https://www.tesla.com/careers/search/job/electrical-engineer-88990',
                'is_remote' => false,
            ],
            // Job 16
            [
                'country_iso' => 'CA',
                'city_name' => 'Vancouver',
                'category_name' => 'Healthcare',
                'company_name' => 'Vancouver Coastal Health',
                'title' => 'Registered Nurse',
                'description' => 'Provide direct patient care in a fast-paced hospital setting. Collaborate with interdisciplinary teams to develop and implement care plans.',
                'requirements' => 'Valid RN license in British Columbia, 2+ years of acute care experience, BLS certification.',
                'apply_url' => 'https://careers.vch.ca/job/12344',
                'is_remote' => false,
            ],
            // Job 17
            [
                'country_iso' => 'NL',
                'city_name' => 'Amsterdam',
                'category_name' => 'IT & Software',
                'company_name' => 'Booking.com',
                'title' => 'Frontend Developer',
                'description' => 'Build responsive and accessible user interfaces for the world\'s leading travel platform. Work with modern JavaScript frameworks and APIs.',
                'requirements' => 'Strong proficiency in React.js, TypeScript, and CSS, experience with CI/CD and testing frameworks.',
                'apply_url' => 'https://jobs.booking.com/careers/job/78912',
                'is_remote' => true,
            ],
            // Job 18
            [
                'country_iso' => 'US',
                'city_name' => 'Portland',
                'category_name' => 'Marketing',
                'company_name' => 'Nike',
                'title' => 'Sports Marketing Lead',
                'description' => 'Develop and execute global marketing campaigns with elite athletes and sports organizations. Drive brand strategy for key product lines.',
                'requirements' => '8+ years in sports marketing, strong network in the sports industry, proven track record in campaign management.',
                'apply_url' => 'https://jobs.nike.com/job/33456',
                'is_remote' => false,
            ],
            // Job 19
            [
                'country_iso' => 'SA',
                'city_name' => 'Riyadh',
                'category_name' => 'Engineering',
                'company_name' => 'Saudi Aramco',
                'title' => 'Petroleum Engineer',
                'description' => 'Optimize oil and gas production from existing fields. Conduct reservoir simulations and design well completion strategies.',
                'requirements' => 'Degree in Petroleum Engineering, 10+ years of experience in upstream operations, knowledge of reservoir engineering software.',
                'apply_url' => 'https://www.aramco.jobs/global/en/job/45679',
                'is_remote' => false,
            ],
            // Job 20
            [
                'country_iso' => 'QA',
                'city_name' => 'Doha',
                'category_name' => 'Customer Support',
                'company_name' => 'Qatar Airways',
                'title' => 'Cabin Crew',
                'description' => 'Ensure the safety, security, and comfort of passengers onboard our flights. Deliver exceptional hospitality service and represent the airline\'s brand.',
                'requirements' => 'Excellent communication skills in English, minimum height of 160cm, ability to swim, willingness to relocate to Doha.',
                'apply_url' => 'https://careers.qatarairways.com/job/11234',
                'is_remote' => false,
            ],
        ];

        // Seed the jobs
        foreach ($realJobs as $jobData) {
            // Find the related taxonomy records
            $country = Country::where('iso2', $jobData['country_iso'])->first();
            $city = null;
            if (!empty($jobData['city_name']) && $country) {
                $city = City::where('country_id', $country->id)
                            ->where('name', $jobData['city_name'])
                            ->first();
            }
            $category = Category::where('name', $jobData['category_name'])->first();

            // Skip if required taxonomy not found
            if (!$country || !$category) {
                continue;
            }

            // Prepare location text for display
            $locationText = $jobData['is_remote'] ? 'Remote' : $jobData['city_name'] . ', ' . $country->name;
            if ($jobData['is_remote'] && $city) {
                $locationText = 'Remote · ' . $city->name . ', ' . $country->name;
            }

            // Generate a simple logo URL using Clearbit
            $logoUrl = 'https://logo.clearbit.com/' . strtolower($jobData['company_name']) . '.com';

            // Create the job record
            Job::updateOrCreate(
                [
                    'company_name' => $jobData['company_name'],
                    'title' => $jobData['title'],
                ],
                [
                    'category_id' => $category->id,
                    'country_id' => $country->id,
                    'city_id' => $city ? $city->id : null,
                    'company_logo_path' => $logoUrl,
                    'description' => $jobData['description'],
                    'requirements' => $jobData['requirements'],
                    'location_text' => $locationText,
                    'apply_url' => $jobData['apply_url'],
                    'seo_title' => $jobData['title'] . ' at ' . $jobData['company_name'] . ' - ' . $country->name,
                    'seo_description' => 'Apply for the ' . $jobData['title'] . ' position at ' . $jobData['company_name'] . ' in ' . $locationText . '. ' . Str::limit($jobData['description'], 150),
                    'published_at' => now(),
                ]
            );
        }
    }
}