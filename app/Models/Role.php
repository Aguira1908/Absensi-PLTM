<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'is_active',
  ];

  /**
   * The attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'is_active' => 'boolean',
    ];
  }

  /**
   * Relasi: Role memiliki banyak Users.
   */
  public function users(): HasMany
  {
    return $this->hasMany(User::class);
  }
}
