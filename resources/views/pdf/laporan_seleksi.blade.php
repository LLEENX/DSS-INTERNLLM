<!DOCTYPE html>
<html>

<head>
    <title>Laporan Hasil Seleksi Magang</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-b: 2px solid #000;
            padding-bottom: 10px;
        }

        .header h2 {
            margin: 0;
            padding: 0;
            font-size: 18px;
        }

        .header p {
            margin: 5px 0 0 0;
            color: #666;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        th {
            bg-color: #f4f4f4;
            font-weight: bold;
        }

        .status-lulus {
            color: green;
            font-weight: bold;
        }

        .status-gagal {
            color: red;
            font-weight: bold;
        }

        .text-center {
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>LAPORAN HASIL SELEKSI REKRUTMEN MAGANG</h2>
        <h2>SISTEM CERDAS - SMARTINTERN</h2>
        <p>Tanggal Cetak: {{ now()->format('d F Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th class="text-center" width="5%">Rank</th>
                <th width="25%">Nama Lengkap</th>
                <th width="15%">NIM</th>
                <th width="25%">Asal Universitas</th>
                <th class="text-center" width="15%">Nilai Preferensi (V)</th>
                <th class="text-center" width="15%">Status Akhir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($laporan as $data)
                <tr>
                    <td class="text-center">{{ $data->rangking }}</td>
                    <td>{{ $data->nama_lengkap }}</td>
                    <td>{{ $data->nim }}</td>
                    <td>{{ $data->asal_universitas }}</td>
                    <td class="text-center">{{ round($data->nilai_preferensi_v, 4) }}</td>
                    <td class="text-center">
                        <span class="{{ $data->status === 'Lulus' ? 'status-lulus' : 'status-gagal' }}">
                            {{ $data->status }}
                        </span>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>