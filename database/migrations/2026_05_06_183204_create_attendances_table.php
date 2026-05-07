<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('attendances', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
      $table->foreignId('shift_id')->nullable()->constrained('shifts')->nullOnDelete()
        ->comment('Mencatat aturan shift apa yang berlaku di hari ini');

      // Tanggal logis sangat krusial untuk shift malam
      $table->date('logical_date')->comment('Tanggal LOGIS absensi, bukan sekadar tanggal kalender');
      $table->enum('status', ['hadir', 'izin', 'sakit', 'alpa'])->comment('hadir, izin, sakit, alpa');

      // Data Absen Masuk
      $table->timestamp('clock_in_time')->nullable();
      $table->longText('clock_in_photo')->nullable();
      $table->decimal('clock_in_lat', 10, 8)->nullable();
      $table->decimal('clock_in_lng', 11, 8)->nullable();

      // Data Absen Pulang
      $table->timestamp('clock_out_time')->nullable();
      $table->longText('clock_out_photo')->nullable();
      $table->decimal('clock_out_lat', 10, 8)->nullable();
      $table->decimal('clock_out_lng', 11, 8)->nullable();

      $table->timestamps();

      // Index untuk query yang sering digunakan
      $table->index(['user_id', 'logical_date']);
      $table->index('logical_date');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('attendances');
  }
};
