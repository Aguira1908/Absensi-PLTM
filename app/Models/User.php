<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
  /** @use HasFactory<UserFactory> */
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'is_active',
    'role_id',
    'department_id',
    'default_shift_id',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'is_active' => 'boolean',
    ];
  }

  /**
   * Determine apakah user boleh akses panel Filament.
   */
  public function canAccessPanel(Panel $panel): bool
  {
      return $this->role?->name === 'admin';
  }

  /**
   * Relasi: User memiliki satu Role.
   */
  public function role(): BelongsTo
  {
    return $this->belongsTo(Role::class);
  }

  /**
   * Relasi: User memiliki satu Department.
   */
  public function department(): BelongsTo
  {
    return $this->belongsTo(Department::class);
  }

  /**
   * Relasi: User memiliki default Shift.
   */
  public function defaultShift(): BelongsTo
  {
    return $this->belongsTo(Shift::class, 'default_shift_id');
  }

  /**
   * Relasi: User memiliki banyak Attendances.
   */
  public function attendances(): HasMany
  {
    return $this->hasMany(Attendance::class);
  }
}
