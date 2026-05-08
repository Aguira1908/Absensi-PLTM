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
    Schema::table('attendances', function (Blueprint $table) {
      $table->text('reason')->nullable()->after('status');
      $table->string('attachment')->nullable()->after('reason');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('attendances', function (Blueprint $table) {
      if (Schema::hasColumn('attendances', 'reason')) {
        $table->dropColumn('reason');
      }
      if (Schema::hasColumn('attendances', 'attachment')) {
        $table->dropColumn('attachment');
      }
    });
  }
};
