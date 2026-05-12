<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;

class CustomLogin extends BaseLogin
{
  // Jika Anda ingin menggunakan view Blade kustom, uncomment baris di bawah ini:
  protected string $view = 'filament.pages.auth.custom-login';
  protected static string $layout = 'filament-panels::components.layouts.base';
  public function mount(): void
  {
    parent::mount();

    // Anda bisa menambahkan logika kustom saat halaman dimuat di sini
  }

  // Contoh: Jika Anda ingin mengubah login menggunakan 'username' alih-alih 'email'
  /*
    protected function getCredentialsFromFormData(array $data): array
    {
        return [
            'username' => $data['email'],
            'password' => $data['password'],
        ];
    }
    */
}
