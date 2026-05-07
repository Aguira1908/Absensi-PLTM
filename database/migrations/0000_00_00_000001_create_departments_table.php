<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * departments dibuat TANPA FK manager_id dulu.
   * FK manager_id → users.id ditambahkan di migration users
   * untuk mengatasi circular dependency.
   */
  public function up(): void
  {
    Schema::create('departments', function (Blueprint $table) {
      $table->id();
      $table->string('name')->comment('Contoh: IT, HRD, Marketing');
      $table->unsignedBigInteger('manager_id')->nullable()
        ->comment('Relasi ke users.id, FK ditambahkan setelah tabel users dibuat');
      $table->boolean('is_active')->default(true);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('departments');
  }
};
