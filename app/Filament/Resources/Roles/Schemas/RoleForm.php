<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Schemas\Schema;

class RoleForm
{
  public static function configure(Schema $schema): Schema
  {
    return $schema
      ->schema([
        TextInput::make('name')
          ->required(),
        Toggle::make('is_active')
          ->required(),
      ]);
  }
}
