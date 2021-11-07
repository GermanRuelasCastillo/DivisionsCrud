<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DivisionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // Will validate the division request
        return [
            'name' => 'required|max:45|unique:divisions',
            'level' => 'required|integer|min:1',
            'collaborator' => 'required|integer|min:1',
            'ambassador' => 'nullable|max:195',
        ];
    }
}
