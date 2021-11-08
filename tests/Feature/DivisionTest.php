<?php

namespace Tests\Feature;

use App\Models\Division;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DivisionTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    /** @test */
    public function test_example()
    {
        $response = $this->get('/api/division');
        $response->assertStatus(200);
    }
    /** @test */
    public function a_division_can_be_show()
    {
        $division = Division::first();
        $response = $this->get('/api/division/'.$division->id);
        $response->assertStatus(200);
    }

    /** @test */
    public function a_division_can_be_store()
    {
        $response = $this->post('/api/division/',[
            'name' => 'Division From test',
            'level' => 5,
            'collaborator' => 15,
            'ambassador' => 'German Ruelas',
        ]);
        $response->assertStatus(200);
        $division = Division::where('name','Division From test')->first();
        $this->assertNotNull($division);
        $this->assertEquals('Division From test',$division->name);
        $this->assertEquals(5,$division->level);
        $this->assertEquals(15,$division->collaborator);
        $this->assertEquals('German Ruelas',$division->ambassador);
    }

    /** @test */
    public function a_division_can_be_update()
    {
        $division = Division::where('name','Division From test')->first();
        $response = $this->put('/api/division/'.$division->id,[
            'name' => 'Division From test updated',
            'level' => 5,
            'collaborator' => 15,
            'ambassador' => 'German Ruelas Castillo',
        ]);
        $response->assertStatus(200);
        $division = Division::where('name','Division From test updated')->first();
        $this->assertNotNull($division);
        $this->assertEquals('Division From test updated',$division->name);
        $this->assertEquals(5,$division->level);
        $this->assertEquals(15,$division->collaborator);
        $this->assertEquals('German Ruelas Castillo',$division->ambassador);
    }
    /** @test */
    public function a_division_can_be_delete()
    {
        $division = Division::where('name','Division From test updated')->first();
        $response = $this->delete('/api/division/'.$division->id);
        $response->assertStatus(200);
        $division = Division::where('name','Division From test updated')->first();
        $this->assertNull($division);
    }
}
