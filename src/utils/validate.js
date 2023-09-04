export function validate_email(email) {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

export function validate_password(password) {
    const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(password);
}

export function validate_code(code) {
    const reg = /^[a-z0-9]{6}$/;
    return reg.test(code);
}

export function check_username(rule, value, callback) {
    if (!value) {
        return callback(new Error('用户名不能为空'));
    }
    if (!validate_email(value)) {
        callback(new Error('请输入正确的邮箱'));
    } else {
        callback();
    }
}

export function check_password(rule, value, callback) {
    if (!value) {
        return callback(new Error('密码不能为空'));
    } else {
        if (!validate_password(value)) {
            callback(new Error('请输入正确的密码'));
        } else {
            callback();
        }
    }

}