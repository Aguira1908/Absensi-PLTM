<?php

namespace App\Filament\Resources\Attendances\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\DatePicker;

class AttendancesTable
{
  public static function configure(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('logical_date')
          ->label('Tanggal')
          ->date('d M Y')
          ->sortable()
          ->searchable(),
        TextColumn::make('user.name')
          ->label('Karyawan')
          ->sortable()
          ->searchable(),
        TextColumn::make('shift.name')
          ->label('Shift')
          ->sortable()
          ->searchable()
          ->toggleable(isToggledHiddenByDefault: true),
        TextColumn::make('status')
          ->label('Status')
          ->badge()
          ->color(fn(string $state): string => match ($state) {
            'hadir' => 'success',
            'izin' => 'warning',
            'sakit' => 'info',
            'alpa' => 'danger',
            default => 'gray',
          })
          ->sortable()
          ->searchable(),
        TextColumn::make('reason')
          ->label('Keterangan')
          ->searchable()
          ->limit(50)
          ->toggleable(),
        TextColumn::make('clock_in_time')
          ->label('Jam Masuk')
          ->time('H:i:s')
          ->sortable()
          ->placeholder('-'),
        ImageColumn::make('clock_in_photo')
          ->label('Foto Masuk')
          ->disk('public')
          ->circular()
          ->toggleable(isToggledHiddenByDefault: true),
        TextColumn::make('clock_out_time')
          ->label('Jam Pulang')
          ->time('H:i:s')
          ->sortable()
          ->placeholder('-'),
        ImageColumn::make('clock_out_photo')
          ->label('Foto Pulang')
          ->disk('public')
          ->circular()
          ->toggleable(isToggledHiddenByDefault: true),
      ])
      ->filters([
        SelectFilter::make('status')
          ->label('Status')
          ->options([
            'hadir' => 'Hadir',
            'izin' => 'Izin',
            'sakit' => 'Sakit',
            'alpa' => 'Alpa',
          ]),
        SelectFilter::make('user_id')
          ->label('Karyawan')
          ->relationship('user', 'name')
          ->searchable()
          ->preload(),
        Filter::make('logical_date')
          ->form([
            DatePicker::make('from')->label('Dari Tanggal'),
            DatePicker::make('until')->label('Sampai Tanggal'),
          ])
          ->query(function (Builder $query, array $data): Builder {
            return $query
              ->when(
                $data['from'],
                fn(Builder $query, $date): Builder => $query->whereDate('logical_date', '>=', $date),
              )
              ->when(
                $data['until'],
                fn(Builder $query, $date): Builder => $query->whereDate('logical_date', '<=', $date),
              );
          }),
      ])
      ->recordActions([
        EditAction::make(),
      ])
      ->toolbarActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
        ]),
      ])
      ->defaultSort('logical_date', 'desc')
      ->striped();
  }
}
