<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">

  <title>{{ config('app.name', 'Laravel') }}</title>

  @viteReactRefresh()
  @vite(['resources/css/app.css', 'resources/js/app.jsx'])
  @inertiaHead()

</head>

<body>
  @inertia()
</body>

</html>
