<?php

namespace App\Filament\Resources\Shifts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ShiftsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Shift')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('start_time')
                    ->label('Jam Masuk')
                    ->time('H:i')
                    ->sortable()
                    ->badge()
                    ->color('success'),
                TextColumn::make('end_time')
                    ->label('Jam Pulang')
                    ->time('H:i')
                    ->sortable()
                    ->badge()
                    ->color('danger'),
                IconColumn::make('is_cross_day')
                    ->label('Beda Hari?')
                    ->boolean()
                    ->trueIcon('heroicon-o-moon')
                    ->falseIcon('heroicon-o-sun')
                    ->trueColor('warning')
                    ->falseColor('primary')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y, H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('id', 'asc')
            ->striped();
    }
}
