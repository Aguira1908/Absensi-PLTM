<x-filament-panels::page>

  {{-- Gunakan tag <form> HTML biasa untuk Livewire --}}
  <form wire:submit="save">

    {{-- Me-render Peta dan Input Radius --}}
    {{ $this->form }}

    {{-- Tombol Simpan --}}
    <div class="mt-6 text-left">
      <x-filament::button color="primary" type="submit">
        Simpan Pengaturan
      </x-filament::button>
    </div>

  </form>

</x-filament-panels::page>
