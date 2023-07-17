const form = document.getElementById('form-1');
const nameInput = document.getElementById('fullname');
const userInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordconfirmInput = document.getElementById('passwordconfirm');
const dateInput = document.getElementById('dateForm');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const telInput = document.getElementById('tel');

// document.getElementById để lấy ra các phần tử HTML có ID tương ứng
const nameError = document.getElementById('nameError');
const userError = document.getElementById('usernameError');
const ConfirmpasswordError = document.getElementById('passwordconfirmError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const dateError = document.getElementById('dateError');
const addressError = document.getElementById('addressError');
const telError = document.getElementById('telError');

// Lấy giá trị ngày, tháng, năm của ngày hiện tại
// var today = new Date();

// var dd = today.getDate();
// var mm = today.getMonth() + 1; //Tháng bắt đầu từ 0
// var yyyy = today.getFullYear();
// form
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn việc submit form

    if (validateForm()) {
        toast("Thành công!", "Bạn đã đăng ký thành công.", "success", 5000);
        // form.reset();
    } else {
        toastError("Thất bại", "Bạn đăng kí chưa thành công.", "error", 5000);
    }
});
// Lấy tất cả các trường nhập liệu trong form
const inputFields = document.querySelectorAll('input');

// Duyệt qua từng trường nhập liệu
inputFields.forEach(input => {
    // Gán sự kiện "blur" cho từng trường nhập liệu
    input.addEventListener('blur', () => {
        // Kiểm tra nội dung của trường nhập liệu
        validateForm(input);
    });
});


// Hàm validate form
function validateForm() {
    let isValid = true;

    // Kiểm tra trường Họ tên
    if (nameInput.value === '') {
        nameError.innerHTML = 'Vui lòng nhập họ tên!';
        isValid = false;
    } else if (nameInput.value.length > 200) {
        nameError.innerHTML = 'Vui lòng không để quá 200 kí tự ';
        isValid = false;
    } else {
        nameError.innerHTML = '';
    }

    // Kiểm tra trường Username
    if (userInput.value === '') {
        userError.innerHTML = 'Vui lòng nhập user name!';
        isValid = false;
    } else if (userInput.value.length > 200) {
        userError.innerHTML = 'Vui lòng không để quá 200 kí tự ';
        isValid = false;
    } else if (!validateUsername(userInput.value)) {
        userError.innerHTML = 'User không để khoảng trống và kí tự đặc biệt!';
        isValid = false;
    } else {
        userError.innerHTML = '';
    }

    // Kiểm tra trường Email
    if (emailInput.value === '') {
        emailError.innerHTML = 'Vui lòng nhập email!';
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.innerHTML = 'Email không đúng định dạng!';
        isValid = false;
    } else if (emailInput.value.length > 100) {
        emailError.innerHTML = 'Email không vượt quá 100 kí tự!';
        isValid = false;
    } else {
        emailError.innerHTML = '';
    }

    // Kiểm tra trường Mật khẩu
    if (passwordInput.value === '') {
        passwordError.innerHTML = 'Vui lòng nhập mật khẩu!';
        isValid = false;
    } else if (6 > passwordInput.value.length ||51 < passwordInput.value.length ) {
        passwordError.innerHTML = 'Mật khẩu phải có ít nhất 6 ký tự và nhỏ hơn 51!';
        isValid = false;
    } else {
        passwordError.innerHTML = '';
    }

    // Kiểm tra trường Mật khẩu Xác nhận
    if (passwordInput.value != passwordconfirmInput.value) {
        ConfirmpasswordError.innerHTML = 'Mật khẩu xác nhận không đúng!';
        isValid = false;
    } else {
        ConfirmpasswordError.innerHTML = '';
    }

    // Kiểm tra trường date
    if (dateInput.value === '') {
        dateError.innerHTML = 'Ngày sinh không được để trống';
        isValid = false;
    } else {
        var birth = new Date(dateInput.value);
        var currentDate = new Date();
        if (birth > currentDate){
            dateError.innerHTML = 'Ngày sinh không được lớn hơn ngày hiện tại.';
            isValid = false;
        }else {
             dateError.innerHTML = '';
        }
    }
    // Kiểm tra trường address
    if(addressInput.value === ''){
        addressError.innerHTML = 'Địa chỉ không được để trống';
        isValid = false;
    }else if (addressInput.value.length > 500) {
        addressError.innerHTML = 'Vui lòng nhập địa chỉ nhỏ hơn 500 kí tự';
        isValid = false;
    } else {
        addressError.innerHTML = '';
    }

    // Kiểm tra trường address
    if (telInput.value == '') {
        telError.innerHTML = 'Vui lòng nhập số điện thoại';
        isValid = false;
    } else if (!validateMobileNumber(telInput.value)) {
        telError.innerHTML = 'Số điện thoại không đúng định dạng';
        isValid = false;
    } else {
        telError.innerHTML = '';
    }
    return isValid;
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Hàm kiểm tra định dạng username
function validateUsername(username) {
    // kiểm tra không có khoảng trắng
    if (/\s/.test(username)) {
        return false;
    }
    // kiểm tra không chứa ký tự đặc biệt trừ '_'
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
        return false;
    }
    // nếu tất cả đều đúng thì trả về true
    return true;
}


// // Kiểm tra ngày sinh không lớn hơn ngày hiện tại
// function validateDateOfBirthLessThanToday(dateOfBirth) {
//     var currentDate = new Date(dateOfBirth);
//     return currentDate <= today;
// }
//Hàm kiểm tra định dạng sdt
function validateMobileNumber(mobile) {
    var regex = /^(0|\+84)\d{9}$/;
    return regex.test(mobile);
}

// Hàm hiển thị thông báo toast
function toast({ title = "Đăng kí thành công!", message = "Bạn đã đăng ký thành công.", type = "success" }) {
    const toast = document.getElementById('toast');
    const iconsuccess = {
        success: "fas fa-check-circle",

    };
// document.getElementById để lấy ra các phần tử HTML có ID tương ứng
    const icons = iconsuccess[type];
    toast.classList.add("toast", `toast--${type}`);
    toast.innerHTML = `
                    <div class="toast__icons">
                    <i class="${icons}"></i> 
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                    </div>
                  `;
    toast.style.display = 'block';
//hi giá trị này được thiết lập, thông báo toast sẽ được hiển thị trên trang web.
    setTimeout(function () {
        toast.style.display = 'none';
    }, 10000);

}
function toastError({ title = "Thất bại!", message = "Bạn đăng kí chưa thành công.", type = "error" }) {
    const toast = document.getElementById('toast');
    const iconserror = {
        error: "fas fa-exclamation-circle"

    };
    const icon = iconserror[type];
    toast.classList.add("toast", `toast--${type}`);
    toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i> 
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                  `;

    toast.style.display = 'block';

    setTimeout(function () {
        toast.style.display = 'none';
    }, 10000);

}