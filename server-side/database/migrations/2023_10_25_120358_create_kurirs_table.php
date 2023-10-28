<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kurirs', function (Blueprint $table) {
            $table->id('id_kurir');
            $table->string('nama_kurir');
            $table->string('nohp_kurir');
            $table->string('alamat_kurir');
            $table->foreignId('id_user')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kurirs');
    }
};
