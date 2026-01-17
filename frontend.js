// ========================================
// FRONTEND: UI 로직
// ========================================

function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    
    if (!password) {
        errorMsg.textContent = '비밀번호를 입력하세요!';
        return;
    }

    const data = getManittoByPassword(password);
    
    if (data) {
        showResult(data);
        errorMsg.textContent = '';
        document.getElementById('passwordInput').value = '';
    } else {
        errorMsg.textContent = '잘못된 비밀번호입니다!';
    }
}

function showResult(data) {
    document.getElementById('welcomeMsg').textContent = `${data.person}님, 환영합니다! 👋`;
    document.getElementById('manittoName').textContent = data.manitto;
    
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('resultSection').classList.add('active');
}

function logout() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('resultSection').classList.remove('active');
    document.getElementById('errorMsg').textContent = '';
}