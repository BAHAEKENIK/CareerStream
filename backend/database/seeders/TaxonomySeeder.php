<?php

namespace Database\Seeders;

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
    }
}