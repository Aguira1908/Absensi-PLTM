<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Pages\Page;
use Filament\Forms\Form;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Components\TextInput;
use Dotswan\MapPicker\Fields\Map;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;
use Illuminate\Contracts\Support\Htmlable;

class ManageOffice extends Page implements HasForms
{

  use InteractsWithForms;

  protected  string $view = 'filament.pages.manage-office';

  public static function getNavigationIcon(): string | null
  {
    return 'heroicon-o-map-pin';
  }

  public static function getNavigationGroup(): string | null
  {
    return 'Pengaturan';
  }

  public  function getTitle(): string | Htmlable
  {
    return 'Lokasi Kantor';
  }

  public static function getNavigationLabel(): string
  {
    return 'Lokasi Kantor';
  }
  public ?array $data = [];
  public function mount(): void
  {
    // Ambil data baris pertama dari tabel settings
    $setting = Setting::query()->first();

    $this->form->fill([
      'location' => [
        'lat' => $setting->office_latitude ?? -5.123456,
        'lng' => $setting->office_longitude ?? 106.123456,
      ],
      'attendance_radius' => $setting->attendance_radius ?? 50,
    ]);
  }

  public function form(Schema $schema): Schema
  {
    return $schema
      ->components([
        Map::make('location')
          ->label('Titik Lokasi Kantor')
          ->columnSpanFull()
          ->zoom(15)
          ->liveLocation()
          ->showMarker()
          ->markerColor('#2563eb'),

        TextInput::make('attendance_radius')
          ->label('Radius Absensi (Meter)')
          ->numeric()
          ->required()
          ->helperText('Batas jarak maksimal karyawan bisa melakukan absen.'),
      ])
      ->statePath('data');
  }
  protected function getFormActions(): array
  {
    return [
      Action::make('save')
        ->label('Simpan Pengaturan')
        ->submit('save'),
    ];
  }

  public function save(): void
  {
    $data = $this->form->getState();

    // Update atau buat baris pertama di database
    Setting::updateOrCreate(
      ['id' => 1],
      [
        'office_latitude' => $data['location']['lat'],
        'office_longitude' => $data['location']['lng'],
        'attendance_radius' => $data['attendance_radius'],
      ]
    );

    Notification::make()
      ->success()
      ->title('Berhasil disimpan')
      ->send();
  }
}
