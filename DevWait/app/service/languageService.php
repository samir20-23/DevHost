<?php

namespace App\Service;

use App\Models\languages;

class languageService 
{
    public function getData() {
        return languages::all();
    }

    public function findData($id) {
        return languages::find($id);
    }

    public function deleteData($id) {
        return languages::destroy($id);
    }

    public function createData($data) {
        return languages::create($data);
    }

    public function updateData($id, $data) {
        $language = languages::find($id);
        if ($language) {
            $language->update($data);
            return $language;
        }
        return null;
    }

    public function getDataByCondition($condition) {
        return languages::where($condition)->get();
    }

    public function countData() {
        return languages::count();
    }

    public function paginateData($perPage) {
        return languages::paginate($perPage);
    }

    public function firstData() {
        return languages::first();
    }

    public function lastData() {
        return languages::latest()->first();
    }
}
