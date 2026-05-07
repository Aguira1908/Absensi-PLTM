<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'user_id',
        'shift_id',
        'logical_date',
        'status',
        'clock_in_time',
        'clock_in_photo',
        'clock_in_lat',
        'clock_in_lng',
        'clock_out_time',
        'clock_out_photo',
        'clock_out_lat',
        'clock_out_lng',
    ];

    protected function casts(): array
    {
        return [
            'logical_date' => 'date',
            'clock_in_time' => 'datetime',
            'clock_out_time' => 'datetime',
            'clock_in_lat' => 'decimal:8',
            'clock_in_lng' => 'decimal:8',
            'clock_out_lat' => 'decimal:8',
            'clock_out_lng' => 'decimal:8',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }
}
