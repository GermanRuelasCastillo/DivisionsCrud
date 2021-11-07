<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seeder for the multiple divisions table
        // This seeder is used to populate the divisions table with data
        $faker = Faker::create();
        for ($i=0; $i < 50; $i++) {
            Division::create([
                'name' => 'Division '.($i+1),
                'level' => rand(1,5),
                'collaborator' => rand(1,15),
                'ambassador' => $i % 2 == 0 ? $faker->name : null
            ]);
        }
        for ($i=0; $i < 50; $i++) {
            Division::where('id',$i+1)->update([
                'parent_id' => rand(2,50),
            ]);
        }

    }
}
