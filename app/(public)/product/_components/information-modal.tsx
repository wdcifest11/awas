import {IoMdCloseCircle} from "react-icons/io";

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InformationModal = ({isOpen, onClose}: InformationModalProps) => {
  if (!isOpen) return null;

  const methodDetails = [
    {
      title: "Metode Beli",
      description:
        "Anda dapat membeli produk ini secara langsung dengan harga penuh. Setelah pembayaran selesai, barang akan menjadi milik Anda.",
      steps: [
        "Pilih produk yang ingin dibeli",
        "Lakukan pembayaran melalui metode yang tersedia",
        "Barang akan dikirim ke alamat Anda",
      ],
    },
    {
      title: "Metode Barter",
      description:
        "Metode barter memungkinkan Anda menukar barang dengan barang lain yang memiliki nilai setara.",
      steps: [
        "Pilih produk yang ingin ditukar",
        "Tentukan barang yang akan Anda tukarkan",
        "Kedua pihak menyepakati nilai tukar",
        "Barang dikirim dan diverifikasi oleh masing-masing pihak",
      ],
    },
    {
      title: "Metode Sewa",
      description:
        "Anda dapat menyewa barang ini untuk jangka waktu tertentu dengan membayar biaya sewa.",
      steps: [
        "Pilih durasi sewa yang tersedia",
        "Bayar biaya sewa sesuai durasi yang dipilih",
        "Gunakan barang selama masa sewa",
        "Kembalikan barang setelah masa sewa berakhir",
      ],
    },
  ];

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-20'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Informasi Metode</h2>
          <button onClick={onClose}>
            <IoMdCloseCircle className='w-7 h-7 text-100' />
          </button>
        </div>
        {methodDetails.map((method, index) => (
          <div key={index} className='mb-4 border-b pb-3'>
            <h3 className='text-md font-bold'>{method.title}</h3>
            <p className='text-gray-600'>{method.description}</p>
            <ul className='mt-2 list-disc list-inside text-gray-500'>
              {method.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className='mt-4 flex justify-end'>
          <button
            className='px-4 py-2 bg-100 text-white rounded-md hover:bg-teal-500'
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
