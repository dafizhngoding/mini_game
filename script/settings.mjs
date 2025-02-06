// File: setting.mjs

// Tangkap semua elemen dengan class 'option-item'
const optionItems = document.querySelectorAll('.option-item');

// Berikan ID pada masing-masing option-item
targetOptionItems(optionItems);

// Fungsi untuk memberikan ID pada setiap div.option-item
function targetOptionItems(items) {
    items.forEach((item, index) => {
        item.id = `option-${index + 1}`; // ID: option-1, option-2, dst.
    });
}

const setting = sessionStorage.getItem('gameSettings')

// Inisialisasi object untuk menyimpan nilai input dengan default value false
let defaultSettings = {
    w: false,
    a: false,
    s: false,
    d: false,
    e: false,
    f: false
};

let settingsObject;
if (setting) {
    settingsObject = {
        ...JSON.parse(setting)
    };
} else {
    settingsObject = {
        ...defaultSettings
    };
}

// Tangkap semua input
const inputs = document.querySelectorAll('.input-setting');

inputs.forEach((input, index) => {
    let key = Object.keys(settingsObject)[index];
    input.setAttribute('value', key);

    input.addEventListener('input', (event) => {
        let newValue = event.target.value.trim().toLowerCase();

        // Validasi: hanya satu huruf yang diperbolehkan
        if (newValue.length > 1 || !/^[a-zA-Z]$/.test(newValue)) {
            newValue = newValue.charAt(0); // Batasi menjadi satu karakter
            event.target.value = newValue.toUpperCase();
        }
        event.target.setAttribute("value", newValue.toUpperCase());

        // Update objek settings dengan menambahkan properti baru jika belum ada
        if (newValue && !settingsObject.hasOwnProperty(newValue)) {
            // Menjaga urutan objek saat mengganti properti
            let oldKey = Object.keys(settingsObject)[index];

            // Menyimpan nilai sebelumnya

            // Hapus properti lama dan tambahkan yang baru
            delete settingsObject[oldKey];
            settingsObject[newValue] = false; // Tambahkan properti baru

            // Menjaga urutan properti setelah update
            const keysOrder = Object.keys(defaultSettings); // Menyimpan urutan properti default
            const updatedSettings = {};

            keysOrder.forEach(key => {
                if (key === newValue) {
                    updatedSettings[key] = settingsObject[key];
                } else if (key !== oldKey) {
                    updatedSettings[key] = settingsObject[key];
                }
            });
            settingsObject = {
                ...updatedSettings
            }; // Perbaharui object sesuai urutan yang diinginkan
        }

        console.log(settingsObject);
        // Update nilai input sesuai dengan yang dimasukkan oleh pengguna
        event.target.value = newValue.toUpperCase();
    });
});

// Fungsi untuk menyimpan setting ke sessionStorage
const applyButton = document.querySelector('#apply').closest('button');
applyButton.addEventListener('click', (event) => {
    event.preventDefault();
    inputs.forEach(input => {
        const inputValue = input.value.trim().toLowerCase();
        if (inputValue && settingsObject[inputValue] === false) {
            input.setAttribute("value", `${inputValue.toUpperCase()}`);
        }
    });
    sessionStorage.setItem('gameSettings', JSON.stringify(settingsObject));
});

// Fungsi untuk mengembalikan ke default setting
const cancelButton = document.querySelector('#cancel').closest('button');
cancelButton.addEventListener('click', () => {
    settingsObject = {
        ...defaultSettings
    };
    inputs.forEach(input => {
        input.value = '';
    });
    sessionStorage.setItem('gameSettings', JSON.stringify(settingsObject));
});

// Set default settings saat halaman dimuat jika belum ada di sessionStorage
if (sessionStorage.getItem('gameSettings')) {
    settingsObject = JSON.parse(sessionStorage.getItem('gameSettings'));

    // Menyinkronkan input dengan nilai setting yang disimpan
    inputs.forEach(input => {
        const key = input.getAttribute('value').toLowerCase();
        if (settingsObject[key] !== undefined) {
            input.value = key.toUpperCase(); // Update input value sesuai dengan sessionStorage
        }
    });
} else {
    sessionStorage.setItem('gameSettings', JSON.stringify(defaultSettings)); // Simpan default jika tidak ada
}