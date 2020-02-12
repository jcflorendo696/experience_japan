<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TeacherRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('trn_teacher_role')->insert([
            'teacher_id'   => '110,250',
            'role'     	   => '1',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('trn_teacher_role')->insert([
            'teacher_id'   	=> '110,250',
            'role'     	   	=> '2',
            'created_at' 	=> Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' 	=> Carbon::now()->format('Y-m-d H:i:s')
        ]);

        DB::table('trn_teacher_role')->insert([
            'teacher_id'   => '110,250',
            'role'     	   => '3',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
