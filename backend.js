// ========================================
// BACKEND: 데이터 관리
// ========================================

// 참가자 이름 설정 (10명)
const PARTICIPANTS = [
    '철수',
    '영희',
    '민수',
    '지은',
    '현우',
    '수진',
    '동욱',
    '서연',
    '준호',
    '미나'
];

// 여기에 생성된 비밀번호와 마니또 정보를 입력하세요
// !!! 주의: 이 부분은 generateInitialData() 실행 후 자동으로 채워집니다 !!!
// !!! 절대로 수동으로 입력하지 마세요 !!!
const GAME_DATA = {
    // 여기가 자동으로 채워집니다
};

// API 함수
function getManittoByPassword(password) {
    return GAME_DATA[password] || null;
}

// 초기 데이터 생성 헬퍼
function generateInitialData() {
    function generateRandomPassword() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let password = '';
        for (let i = 0; i < 6; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    function assignManitto(names) {
        let assignments;
        let isValid = false;
        let attempts = 0;

        while (!isValid && attempts < 1000) {
            const shuffled = [...names].sort(() => Math.random() - 0.5);
            assignments = names.map((name, idx) => ({
                person: name,
                manitto: shuffled[idx]
            }));
            isValid = assignments.every(a => a.person !== a.manitto);
            attempts++;
        }
        return assignments;
    }

    const assignments = assignManitto(PARTICIPANTS);
    const usedPasswords = new Set();
    const result = {};

    assignments.forEach(assignment => {
        let password;
        do {
            password = generateRandomPassword();
        } while (usedPasswords.has(password));
        
        usedPasswords.add(password);
        result[password] = {
            person: assignment.person,
            manitto: assignment.manitto
        };
    });

    console.log('=== 1단계: 아래 코드를 복사하여 GAME_DATA를 교체하세요 ===\n');
    console.log(`const GAME_DATA = ${JSON.stringify(result, null, 2)};`);
    console.log('\n=== 2단계: 각 참가자에게 비밀번호를 개별 전달하세요 ===');
    Object.keys(result).forEach(password => {
        console.log(`${result[password].person}: ${password}`);
    });
    console.log('\n=== 3단계: generateInitialData() 호출을 주석 처리하세요 ===');
    console.log('=== 4단계: 이 콘솔 내용을 즉시 삭제하세요! ===');
}

// ⬇️ 주석을 해제하고 한 번만 실행
generateInitialData();