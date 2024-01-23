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
        Schema::create('barangs', function (Blueprint $table) {
            $table->id('id_barang');
            $table->unsignedBigInteger('id_suplier');
            $table->unsignedBigInteger('id_kurir')->nullable();
            $table->unsignedBigInteger('id_admin')->nullable();
            $table->integer('no_resi')->unique();
            $table->string('nama_barang', 100);
            $table->string('jumlah_barang', 100);
            $table->string('nama_penerima', 100);
            $table->string('alamat_penerima', 100);
            $table->string('nohp_penerima', 100)->nullable();
            $table->string('daerah_barang', 100);
            $table->string('plat', 100);
            $table->string('status')->default('proses');
            $table->string('foto')->nullable();
            $table->timestamps();

            $table->foreign('id_suplier')->references('id_suplier')->on('supliers');
            $table->foreign('id_kurir')->references('id_kurir')->on('kurirs');
            $table->foreign('id_admin')->references('id_admin')->on('admins');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('barangs');
    }
};
