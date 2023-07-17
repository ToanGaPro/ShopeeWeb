// đối tượng validator
function Validator(options) {
    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rules (kiểm tra)
        // nếu có lỗi dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

        return !!errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // khi submit form
        formElement.onsubmit = function (e) {
            e.prevenDefault();
            
            var isFormValid = true;
            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }

            });
            if(isFormValid){
                console.log("lỗi");
            }else{
                console.log("lỗi");
            }
        }
        // Lặp qua mỗi rule và xử lý sự kiện lắng nghe
        options.rules.forEach(function (rule) {

            //Lưu lại các rules cho mỗi rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // xử lí trường hợp blur hỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // xử lí mỗi khi người dùng nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
        });
    }

}
//Định nghĩa rules
// Nguyên tắc của các rules
// 1. Khi có lỗi => trả ra message lỗi
// 2. kHI HỢP lệ =? không trả ra cái gì cả(undefier)
Validator.isRequired = function (selector, max) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : `Vui lòng nhập họ tên đầy đủ và  nhỏ hơn ${max}`
        }
    };
}

Validator.isEmail = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // regex kiểm tra định dạng email
            return regex.test(value) ? undefined : message || `Sai định dạng email và phải nhỏ hơn  ${max}`
        }
    };
}

Validator.isPassword = function (selector, min, max, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập mật khẩu tối thiểu  ${min} và nhỏ hơn ${max}`
        }
    }
}

Validator.isPasswordConfrim = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value == getConfirmValue() ? undefined : message || `Giá trị nhập không chính xác!`
        }
    }
}
Validator.isAddress = function (selector, max) {
    return {
        selector: selector,
        test: function (value) {
            return value.length < max ? undefined : message || `Địa chỉ phải nhỏ hơn ${max}!`
        }
    };
}
Validator.isNumber = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
            if (!value.trim() || !regex.test(value.trim())) {
                return 'Vui lòng nhập số điện thoại hợp lệ bắt đầu từ số 0 hoặc +84 ';
            }
            return undefined;
        }
    }
}

Validator.isUsername = function (selector, max) {
    const regex = /^\S{1,200}$/g;
    return {
        selector: selector,
        test: function (value) {
            const isMatch = regex.test(value) && /^[a-zA-Z0-9_]*$/g.test(value);
            if (isMatch) {
                return value.trim() ? undefined : `Vui lòng nhập họ tên đầy đủ và nhỏ hơn ${max} ký tự`;
            } else {
                return `Tên đăng nhập không hợp lệ. Tên đăng nhập chỉ bao gồm chữ cái, số và gạch dưới, không có khoảng trắng và phải ít hơn hoặc bằng ${max} ký tự.`;
            }
        },
    };
};
Validator.isDateForm = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (!value.trim()) {
                return 'Vui lòng nhập ngày vào gỏm';
            }
            const inputDate = new Date(value);
            const currentDate = new Date();
            if (inputDate > currentDate) {
                return 'Ngày không được lớn hơn ngày hiện tại';
            }
            return undefined;
        },
    };
}

