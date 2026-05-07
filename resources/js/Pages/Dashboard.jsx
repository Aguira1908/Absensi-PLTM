import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden flex flex-col gap-8 p-6 text-gray-900 bg-white shadow-sm sm:rounded-lg">
            <h1 className="text-2xl">
              Pastikan anda sudah absen Masuk dan Pulang hari ini!
            </h1>
            <Link href="/absensi">
              <p className="px-6 w-fit text-white text-xl rounded-xl bg-blue-600 py-2">
                Absen
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
