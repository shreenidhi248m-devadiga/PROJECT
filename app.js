/* ==========================================================================
   COLLEGE MANAGEMENT SYSTEM — LOGIC (app.js)
   Full interactive support for Fixed 540px Canvas & Percentage Positioning
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Global State
  const state = {
    activeRole: 'admin',
    authMode: 'login',
    isLoggedIn: false,
    currentUser: null,
    registeredUsers: [
      { role: 'admin', name: 'System Administrator', user: 'admin', pass: 'password123', dept: 'All' },
      { role: 'faculty', name: 'Prof. Rajesh Sharma', user: 'FAC202601', pass: 'password123', dept: 'BCA' },
      { role: 'student', name: 'Ananya P', user: '1', pass: 'password123', dept: 'BCA' }
    ],
    collegeInfo: {
      name: "ABC COLLEGE OF SCIENCE",
      address: "KUNDAPURA, UTTARA KANNADA, KARNATAKA - 576201",
      principalPhone: "+91 98450 12345",
      courses: ["BCA", "B.Com", "BBA"]
    },
    facultiesData: {
      satish: {
        fullname: "Dr. Satish Kumar",
        role: "HOD — BCA DEPARTMENT",
        desig: "Head of Department & Senior Professor",
        qual: "Ph.D. in Computer Science",
        dept: "BCA",
        phone: "+91 98450 11111",
        email: "satish.bca@abccollege.edu",
        exp: "18 Years",
        spec: "Artificial Intelligence, Cloud Computing & Big Data"
      },
      rajesh: {
        fullname: "Prof. Rajesh Sharma",
        role: "Associate Professor — BCA",
        desig: "Associate Professor",
        qual: "M.Tech (Computer Science & Engineering)",
        dept: "BCA",
        phone: "+91 98450 11112",
        email: "rajesh.bca@abccollege.edu",
        exp: "12 Years",
        spec: "Java Programming, Data Structures & Web Tech"
      },
      anitha: {
        fullname: "Prof. Anitha Rao",
        role: "Assistant Professor — BCA",
        desig: "Assistant Professor",
        qual: "MCA, M.Phil",
        dept: "BCA",
        phone: "+91 98450 11113",
        email: "anitha.bca@abccollege.edu",
        exp: "8 Years",
        spec: "Database Management Systems & Python"
      },
      radhika: {
        fullname: "Prof. Radhika Shetty",
        role: "HOD — B.COM DEPARTMENT",
        desig: "Head of Department & Senior Professor",
        qual: "M.Com, M.Phil",
        dept: "B.Com",
        phone: "+91 98450 22222",
        email: "radhika.bcom@abccollege.edu",
        exp: "16 Years",
        spec: "Corporate Accounting, Financial Analytics & Auditing"
      },
      suresh: {
        fullname: "Prof. Suresh Bhat",
        role: "Assistant Professor — B.Com",
        desig: "Assistant Professor",
        qual: "M.Com, NET Qualified",
        dept: "B.Com",
        phone: "+91 98450 22223",
        email: "suresh.bcom@abccollege.edu",
        exp: "9 Years",
        spec: "Direct & Indirect Taxation, Business Statistics"
      },
      kvrao: {
        fullname: "Prof. K. V. Rao",
        role: "HOD — BBA DEPARTMENT",
        desig: "Head of Department & Senior Professor",
        qual: "MBA, Ph.D. in Management",
        dept: "BBA",
        phone: "+91 98450 33333",
        email: "kvrao.bba@abccollege.edu",
        exp: "15 Years",
        spec: "Strategic Management, HR & Organisational Behaviour"
      },
      priya: {
        fullname: "Prof. Priya Hegde",
        role: "Assistant Professor — BBA",
        desig: "Assistant Professor",
        qual: "MBA (HR & Marketing)",
        dept: "BBA",
        phone: "+91 98450 33334",
        email: "priya.bba@abccollege.edu",
        exp: "7 Years",
        spec: "Digital Marketing, Consumer Behaviour & Entrepreneurship"
      }
    },
    studentsList: [
      {
        roll: "1",
        name: "Ananya P",
        gender: "Female",
        course: "BCA",
        year: "1st Year",
        dob: "15-07-2006",
        phone: "9876543210",
        email: "ananya.p@gmail.com",
        address: "Kundapura, Uttara Kannada",
        photo: "assets/student_ananya.jpg",
        sgpa: { sem1: "9.15", sem2: "9.32", sem3: "9.48", sem4: "-" },
        exams: { ia1: "89/100", ia2: "92/100", mid: "90/100", end: "94/100" },
        attStats: { total: 120, attended: 98, absent: 22, percent: "81.67" }
      },
      {
        roll: "2",
        name: "Bharath S",
        gender: "Male",
        course: "B.Com",
        year: "1st Year",
        dob: "22-11-2005",
        phone: "9876543211",
        email: "bharath.s@gmail.com",
        address: "Udupi, Karnataka",
        photo: "",
        sgpa: { sem1: "8.75", sem2: "8.90", sem3: "9.10", sem4: "-" },
        exams: { ia1: "82/100", ia2: "86/100", mid: "88/100", end: "90/100" },
        attStats: { total: 120, attended: 104, absent: 16, percent: "86.67" }
      },
      {
        roll: "3",
        name: "Chaithra M",
        gender: "Female",
        course: "BCA",
        year: "1st Year",
        dob: "04-03-2006",
        phone: "9876543212",
        email: "chaithra.m@gmail.com",
        address: "Mangalore, Karnataka",
        photo: "",
        sgpa: { sem1: "9.40", sem2: "9.55", sem3: "9.60", sem4: "-" },
        exams: { ia1: "94/100", ia2: "96/100", mid: "95/100", end: "97/100" },
        attStats: { total: 120, attended: 112, absent: 8, percent: "93.33" }
      },
      {
        roll: "4",
        name: "Deepak R",
        gender: "Male",
        course: "BBA",
        year: "1st Year",
        dob: "18-09-2005",
        phone: "9876543213",
        email: "deepak.r@gmail.com",
        address: "Karkala, Karnataka",
        photo: "",
        sgpa: { sem1: "8.20", sem2: "8.40", sem3: "8.65", sem4: "-" },
        exams: { ia1: "78/100", ia2: "80/100", mid: "84/100", end: "86/100" },
        attStats: { total: 120, attended: 95, absent: 25, percent: "79.17" }
      },
      {
        roll: "5",
        name: "Harshitha P",
        gender: "Female",
        course: "B.Com",
        year: "1st Year",
        dob: "12-01-2006",
        phone: "9876543214",
        email: "harshitha.p@gmail.com",
        address: "Brahmawar, Karnataka",
        photo: "",
        sgpa: { sem1: "9.00", sem2: "9.15", sem3: "9.30", sem4: "-" },
        exams: { ia1: "88/100", ia2: "90/100", mid: "91/100", end: "93/100" },
        attStats: { total: 120, attended: 108, absent: 12, percent: "90.00" }
      },
      {
        roll: "6",
        name: "Karthik N",
        gender: "Male",
        course: "BCA",
        year: "2nd Year",
        dob: "30-05-2004",
        phone: "9876543215",
        email: "karthik.n@gmail.com",
        address: "Kundapura, Karnataka",
        photo: "",
        sgpa: { sem1: "8.90", sem2: "9.05", sem3: "9.20", sem4: "9.35" },
        exams: { ia1: "85/100", ia2: "89/100", mid: "90/100", end: "92/100" },
        attStats: { total: 120, attended: 100, absent: 20, percent: "83.33" }
      },
      {
        roll: "7",
        name: "Likitha J",
        gender: "Female",
        course: "BBA",
        year: "2nd Year",
        dob: "14-08-2004",
        phone: "9876543216",
        email: "likitha.j@gmail.com",
        address: "Byndoor, Karnataka",
        photo: "",
        sgpa: { sem1: "8.50", sem2: "8.60", sem3: "8.75", sem4: "8.90" },
        exams: { ia1: "80/100", ia2: "84/100", mid: "86/100", end: "88/100" },
        attStats: { total: 120, attended: 96, absent: 24, percent: "80.00" }
      },
      {
        roll: "8",
        name: "Manoj S",
        gender: "Male",
        course: "B.Com",
        year: "3rd Year",
        dob: "02-12-2004",
        phone: "9876543217",
        email: "manoj.s@gmail.com",
        address: "Saligrama, Karnataka",
        photo: "",
        sgpa: { sem1: "8.10", sem2: "8.30", sem3: "8.50", sem4: "8.60" },
        exams: { ia1: "76/100", ia2: "80/100", mid: "82/100", end: "85/100" },
        attStats: { total: 120, attended: 92, absent: 28, percent: "76.67" }
      }
    ],
    achievementsList: [
      { id: 1, year: "2025-26", name: "Ananya P", avatar: "assets/student_ananya.jpg", course: "BCA", title: "Smart India Hackathon 2026", level: "National", award: "Winner", date: "15-03-2026" },
      { id: 2, year: "2024-25", name: "Bharath S", avatar: "BS", course: "B.Com", title: "Inter College Quiz Competition", level: "State", award: "1st Prize", date: "21-01-2025" },
      { id: 3, year: "2023-24", name: "Chaithra M", avatar: "CM", course: "BCA", title: "Project Expo", level: "National", award: "2nd Prize", date: "12-09-2024" },
      { id: 4, year: "2023-24", name: "Deepak R", avatar: "DR", course: "BBA", title: "Youth Festival", level: "State", award: "Best Performer", date: "05-02-2024" },
      { id: 5, year: "2023-24", name: "Harshitha P", avatar: "HP", course: "B.Com", title: "Business Plan Competition", level: "National", award: "Finalist", date: "20-11-2023" }
    ],
    complaintsList: [
      { id: "1", student: "Ananya P", roll: "1", dept: "BCA", category: "Library", subject: "Request for Python programming reference books in lab", date: "22-08-2026", status: "Pending" },
      { id: "2", student: "Bharath S", roll: "2", dept: "B.Com", category: "Infrastructure", subject: "Projector replacement in Seminar Hall B", date: "20-08-2026", status: "In Review" },
      { id: "3", student: "Chaithra M", roll: "3", dept: "BCA", category: "Lab Equipment", subject: "System #14 RAM upgrade request for Web Dev project", date: "18-08-2026", status: "Resolved" },
      { id: "4", student: "Deepak R", roll: "4", dept: "BBA", category: "Canteen", subject: "Request for more drinking water dispensers on 2nd Floor", date: "15-08-2026", status: "Resolved" }
    ]
  };

  const roleCredentials = {
    admin: {
      title: "ADMINISTRATOR PORTAL",
      userLabel: "Username / Admin ID",
      userIcon: "fa-user-shield",
      userVal: "admin",
      passVal: "password123",
      btnText: "LOG IN TO ADMIN PORTAL",
      showDept: false
    },
    faculty: {
      title: "FACULTY PORTAL",
      userLabel: "Faculty Employee ID",
      userIcon: "fa-id-badge",
      userVal: "FAC202601",
      passVal: "password123",
      btnText: "LOG IN TO FACULTY PORTAL",
      showDept: true
    },
    student: {
      title: "STUDENT PORTAL",
      userLabel: "Student USN / Roll No",
      userIcon: "fa-id-card",
      userVal: "1",
      passVal: "password123",
      btnText: "LOG IN TO STUDENT PORTAL",
      showDept: true
    }
  };

  // DOM Elements
  const sidebarNav = document.getElementById('sidebar-nav');
  const viewPanels = document.querySelectorAll('.view-panel');
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const windowTitle = document.getElementById('window-title');
  const toastContainer = document.getElementById('toast-container');
  const portalBadgeText = document.getElementById('portal-badge-text');

  // Auth Elements
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const linkGotoRegister = document.getElementById('link-goto-register');
  const linkGotoLogin = document.getElementById('link-goto-login');

  const roleSelectBtns = document.querySelectorAll('.role-select-btn');
  const loginAvatarIcon = document.getElementById('login-avatar-icon');
  const loginPortalTitle = document.getElementById('login-portal-title');
  const loginUserLabel = document.getElementById('login-user-label');
  const loginUserIcon = document.getElementById('login-user-icon');
  const loginUser = document.getElementById('login-user');
  const loginPass = document.getElementById('login-pass');
  const btnTogglePass = document.getElementById('btn-toggle-pass');
  const eyeIcon = document.getElementById('eye-icon');
  const loginDeptGroup = document.getElementById('login-dept-group');

  const regName = document.getElementById('reg-name');
  const regUser = document.getElementById('reg-user');
  const regDept = document.getElementById('reg-dept');
  const regPass = document.getElementById('reg-pass');
  const btnToggleRegPass = document.getElementById('btn-toggle-reg-pass');
  const regEyeIcon = document.getElementById('reg-eye-icon');

  const btnLogout = document.getElementById('btn-logout');

  // Toast Helper
  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Live Clock
  const clockTime = document.getElementById('clock-time');
  function updateClock() {
    const now = new Date();
    if (clockTime) clockTime.textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  // View Switcher
  const viewTitles = {
    'college-profile': 'COLLEGE DASHBOARD & INFORMATION',
    'college-info': 'COLLEGE DETAILS & FACULTIES DIRECTORY',
    'students': 'STUDENT PROFILE & DETAILS',
    'achievements': 'ACHIEVEMENTS & PERFORMANCE',
    'statistics': 'CAMPUS STATISTICAL OVERVIEW & GROWTH',
    'complaint': 'STUDENT COMPLAINTS LOG & REDRESSAL',
    'login': 'ABC COLLEGE OF SCIENCE — SECURE PORTAL LOGIN'
  };

  function switchView(viewId) {
    viewPanels.forEach(panel => panel.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    const targetPanel = document.getElementById(`view-${viewId}`);
    if (targetPanel) targetPanel.classList.add('active');

    const targetNavItem = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (targetNavItem) targetNavItem.classList.add('active');

    if (windowTitle && viewTitles[viewId]) {
      windowTitle.textContent = viewTitles[viewId];
    }
  }

  // Inline Register & Login Switch Links
  if (linkGotoRegister && linkGotoLogin) {
    linkGotoRegister.addEventListener('click', (e) => {
      e.preventDefault();
      state.authMode = 'register';
      loginForm.classList.add('hidden-form');
      registerForm.classList.remove('hidden-form');
    });

    linkGotoLogin.addEventListener('click', (e) => {
      e.preventDefault();
      state.authMode = 'login';
      registerForm.classList.add('hidden-form');
      loginForm.classList.remove('hidden-form');
    });
  }

  // Password Eye Toggle
  if (btnTogglePass && loginPass) {
    btnTogglePass.addEventListener('click', (e) => {
      e.preventDefault();
      const currentType = loginPass.getAttribute('type');
      loginPass.setAttribute('type', currentType === 'password' ? 'text' : 'password');
      if (eyeIcon) eyeIcon.className = currentType === 'password' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });
  }

  if (btnToggleRegPass && regPass) {
    btnToggleRegPass.addEventListener('click', (e) => {
      e.preventDefault();
      const currentType = regPass.getAttribute('type');
      regPass.setAttribute('type', currentType === 'password' ? 'text' : 'password');
      if (regEyeIcon) regEyeIcon.className = currentType === 'password' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });
  }

  function configureRole(role) {
    state.activeRole = role;
    const config = roleCredentials[role];

    roleSelectBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    if (loginPortalTitle) loginPortalTitle.textContent = config.title;
    if (loginUserLabel) loginUserLabel.textContent = config.userLabel;
    if (loginUserIcon) loginUserIcon.className = `fa-solid ${config.userIcon}`;
    if (loginUser) loginUser.value = config.userVal;
    if (loginPass) loginPass.value = config.passVal;

    if (loginDeptGroup) loginDeptGroup.classList.toggle('hidden-field', !config.showDept);
  }

  roleSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => configureRole(btn.dataset.role));
  });

  // Handle Registration
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = regName ? regName.value.trim() : '';
      const user = regUser ? regUser.value.trim() : '';
      const pass = regPass ? regPass.value.trim() : '';
      const dept = regDept ? regDept.value : 'BCA';

      if (!name || !user || !pass) {
        showToast('Please fill out all registration fields.', 'warning');
        return;
      }

      const existing = state.registeredUsers.find(u => u.user.toLowerCase() === user.toLowerCase());
      if (existing) {
        showToast('Username/ID already registered! Please log in.', 'warning');
        registerForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginUser.value = user;
        return;
      }

      state.registeredUsers.push({
        role: state.activeRole,
        name: name,
        user: user,
        pass: pass,
        dept: dept
      });

      showToast(`Registration Successful for ${name}! Log in now.`, 'success');

      registerForm.classList.add('hidden-form');
      loginForm.classList.remove('hidden-form');
      if (loginUser) loginUser.value = user;
      if (loginPass) loginPass.value = pass;
    });
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userVal = loginUser ? loginUser.value.trim() : '';
      const passVal = loginPass ? loginPass.value.trim() : '';

      const account = state.registeredUsers.find(u =>
        u.user.toLowerCase() === userVal.toLowerCase() &&
        u.role === state.activeRole
      );

      if (!account) {
        showToast('Account not found! Please REGISTER FIRST before logging in.', 'warning');
        loginForm.classList.add('hidden-form');
        registerForm.classList.remove('hidden-form');
        if (regUser) regUser.value = userVal;
        return;
      }

      if (account.pass !== passVal) {
        showToast('Incorrect password! Please try again.', 'warning');
        return;
      }

      performLogin(account);
    });
  }

  function performLogin(account) {
    state.isLoggedIn = true;
    state.currentUser = account;

    if (sidebarNav) sidebarNav.classList.remove('hidden-sidebar');
    if (portalBadgeText) portalBadgeText.textContent = `${account.role.toUpperCase()} PORTAL ACTIVE`;

    switchView('college-profile');
    showToast(`Welcome back, ${account.name}! Logged in successfully.`, 'success');
  }

  // Logout Handler
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      state.isLoggedIn = false;
      state.currentUser = null;
      if (sidebarNav) sidebarNav.classList.add('hidden-sidebar');
      if (portalBadgeText) portalBadgeText.textContent = 'Portal Offline';
      switchView('login');
      showToast('Logged out successfully.', 'info');
    });
  }

  // Navigation Click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const viewId = item.dataset.view;
      if (viewId) switchView(viewId);
    });
  });


  // ==========================================================================
  // PAGE 1: COLLEGE INFO & ADD FACULTY
  // ==========================================================================
  const btnToggleAddFaculty = document.getElementById('btn-toggle-add-faculty');
  const formAddFaculty = document.getElementById('form-add-faculty');
  const btnCancelFaculty = document.getElementById('btn-cancel-faculty');

  if (btnToggleAddFaculty && formAddFaculty) {
    btnToggleAddFaculty.addEventListener('click', () => {
      formAddFaculty.classList.toggle('hidden-form');
    });
  }

  if (btnCancelFaculty && formAddFaculty) {
    btnCancelFaculty.addEventListener('click', () => {
      formAddFaculty.classList.add('hidden-form');
    });
  }

  // ADD FACULTY SUBMIT HANDLER
  if (formAddFaculty) {
    formAddFaculty.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('input-fac-name').value.trim();
      const dept = document.getElementById('select-fac-dept').value;
      const desig = document.getElementById('input-fac-desig').value.trim();
      const qual = document.getElementById('input-fac-qual').value.trim();
      const phone = document.getElementById('input-fac-phone').value.trim() || "+91 98450 00000";
      const email = document.getElementById('input-fac-email').value.trim() || `${name.split(' ')[0].toLowerCase()}@abccollege.edu`;
      const spec = document.getElementById('input-fac-spec').value.trim() || "Academic Teaching & Mentorship";

      if (!name || !desig || !qual) {
        showToast('Please fill out Faculty Name, Designation, and Qualification.', 'warning');
        return;
      }

      const facId = `fac_${Date.now()}`;
      const newFaculty = {
        fullname: name,
        role: `${desig} — ${dept} DEPARTMENT`,
        desig: desig,
        qual: qual,
        dept: dept,
        phone: phone,
        email: email,
        exp: "5 Years",
        spec: spec
      };

      state.facultiesData[facId] = newFaculty;

      // Append to chosen department list
      let targetListId = 'list-faculties-bca';
      if (dept === 'B.Com') targetListId = 'list-faculties-bcom';
      if (dept === 'BBA') targetListId = 'list-faculties-bba';

      const targetListContainer = document.getElementById(targetListId);
      if (targetListContainer) {
        const item = document.createElement('div');
        item.className = 'faculty-line-item';
        item.setAttribute('data-faculty-id', facId);
        item.innerHTML = `
          <span class="faculty-line-name">${name}</span>
          <span class="faculty-line-role">${desig}</span>
        `;
        targetListContainer.appendChild(item);
        attachFacultyClickHandlers();
      }

      formAddFaculty.reset();
      formAddFaculty.classList.add('hidden-form');
      showToast(`${name} added to ${dept} Department successfully!`, 'success');
    });
  }

  // FACULTY LINE CLICK HANDLER
  const modalFacultyDetails = document.getElementById('modal-faculty-details');
  const btnCloseFacultyModal = document.getElementById('btn-close-faculty-modal');

  const modalFacultyName = document.getElementById('modal-faculty-name');
  const modalFacultyRole = document.getElementById('modal-faculty-role');
  const modalFacultyFullname = document.getElementById('modal-faculty-fullname');
  const modalFacultyDesig = document.getElementById('modal-faculty-desig');
  const modalFacultyQual = document.getElementById('modal-faculty-qual');
  const modalFacultyDept = document.getElementById('modal-faculty-dept');
  const modalFacultyPhone = document.getElementById('modal-faculty-phone');
  const modalFacultyEmail = document.getElementById('modal-faculty-email');
  const modalFacultyExp = document.getElementById('modal-faculty-exp');
  const modalFacultySpec = document.getElementById('modal-faculty-spec');

  function attachFacultyClickHandlers() {
    document.querySelectorAll('.faculty-line-item').forEach(item => {
      item.onclick = () => {
        const facId = item.dataset.facultyId;
        const data = state.facultiesData[facId];
        if (data && modalFacultyDetails) {
          if (modalFacultyName) modalFacultyName.textContent = data.fullname;
          if (modalFacultyRole) modalFacultyRole.textContent = data.role;
          if (modalFacultyFullname) modalFacultyFullname.textContent = data.fullname;
          if (modalFacultyDesig) modalFacultyDesig.textContent = data.desig;
          if (modalFacultyQual) modalFacultyQual.textContent = data.qual;
          if (modalFacultyDept) modalFacultyDept.textContent = data.dept;
          if (modalFacultyPhone) modalFacultyPhone.textContent = data.phone;
          if (modalFacultyEmail) modalFacultyEmail.textContent = data.email;
          if (modalFacultyExp) modalFacultyExp.textContent = data.exp;
          if (modalFacultySpec) modalFacultySpec.textContent = data.spec;

          modalFacultyDetails.classList.remove('hidden-modal');
        }
      };
    });
  }

  attachFacultyClickHandlers();

  if (btnCloseFacultyModal && modalFacultyDetails) {
    btnCloseFacultyModal.addEventListener('click', () => {
      modalFacultyDetails.classList.add('hidden-modal');
    });

    modalFacultyDetails.addEventListener('click', (e) => {
      if (e.target === modalFacultyDetails) {
        modalFacultyDetails.classList.add('hidden-modal');
      }
    });
  }


  // ==========================================================================
  // PAGE 4: STUDENTS (YEAR WISE SEARCH & CLASS SEPARATION)
  // ==========================================================================
  const btnDeptSelects = document.querySelectorAll('.btn-dept-select');
  const btnYearSelects = document.querySelectorAll('.btn-year-select');
  const filterYearDropdown = document.getElementById('filter-year-dropdown');
  const searchStudentInput = document.getElementById('search-student-input');
  const studentListTableBody = document.getElementById('student-list-table-body');
  const studentCountDisplay = document.getElementById('student-count-display');

  let activeDeptFilter = 'All';
  let activeYearFilter = 'All';

  function filterStudentRoster() {
    if (!studentListTableBody) return;
    const rows = studentListTableBody.querySelectorAll('tr');
    const query = searchStudentInput ? searchStudentInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    rows.forEach(row => {
      const rowCourse = row.dataset.course;
      const rowYear = row.dataset.year;
      const rowText = row.textContent.toLowerCase();

      const matchDept = (activeDeptFilter === 'All' || rowCourse === activeDeptFilter);
      const matchYear = (activeYearFilter === 'All' || rowYear === activeYearFilter);
      const matchQuery = (!query || rowText.includes(query));

      if (matchDept && matchYear && matchQuery) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (studentCountDisplay) {
      studentCountDisplay.textContent = `(Total: ${visibleCount})`;
    }
  }

  btnDeptSelects.forEach(btn => {
    btn.addEventListener('click', () => {
      btnDeptSelects.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDeptFilter = btn.dataset.deptFilter;
      filterStudentRoster();
    });
  });

  btnYearSelects.forEach(btn => {
    btn.addEventListener('click', () => {
      btnYearSelects.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeYearFilter = btn.dataset.yearFilter;

      if (filterYearDropdown) filterYearDropdown.value = activeYearFilter;
      filterStudentRoster();
    });
  });

  if (filterYearDropdown) {
    filterYearDropdown.addEventListener('change', () => {
      activeYearFilter = filterYearDropdown.value;

      btnYearSelects.forEach(b => {
        b.classList.toggle('active', b.dataset.yearFilter === activeYearFilter);
      });

      filterStudentRoster();
      showToast(`Showing ${activeYearFilter} Students`, 'info');
    });
  }

  if (searchStudentInput) {
    searchStudentInput.addEventListener('input', filterStudentRoster);
  }

  const tableStudentList = document.getElementById('table-student-list');
  const detailStuPhoto = document.getElementById('detail-stu-photo');
  const detailStuName = document.getElementById('detail-stu-name');
  const detailStuRoll = document.getElementById('detail-stu-roll');
  const detailStuGender = document.getElementById('detail-stu-gender');
  const detailStuCourse = document.getElementById('detail-stu-course');
  const detailStuPhone = document.getElementById('detail-stu-phone');
  const detailStuYear = document.getElementById('detail-stu-year');
  const detailStuEmail = document.getElementById('detail-stu-email');
  const detailStuDob = document.getElementById('detail-stu-dob');
  const detailStuAddress = document.getElementById('detail-stu-address');

  function selectStudentRow(roll) {
    const student = state.studentsList.find(s => s.roll === roll) || state.studentsList[0];
    if (!student) return;

    if (tableStudentList) {
      tableStudentList.querySelectorAll('tbody tr').forEach(tr => {
        tr.classList.toggle('selected-row', tr.dataset.roll === roll);
      });
    }

    if (detailStuPhoto) detailStuPhoto.src = student.photo || "assets/student_ananya.jpg";
    if (detailStuName) detailStuName.textContent = `: ${student.name}`;
    if (detailStuRoll) detailStuRoll.textContent = `: ${student.roll}`;
    if (detailStuGender) detailStuGender.textContent = `: ${student.gender}`;
    if (detailStuCourse) detailStuCourse.textContent = `: ${student.course}`;
    if (detailStuPhone) detailStuPhone.textContent = `: ${student.phone}`;
    if (detailStuYear) detailStuYear.textContent = `: ${student.year}`;
    if (detailStuEmail) detailStuEmail.textContent = `: ${student.email}`;
    if (detailStuDob) detailStuDob.textContent = `: ${student.dob}`;
    if (detailStuAddress) detailStuAddress.textContent = `: ${student.address}`;
  }

  if (tableStudentList) {
    tableStudentList.querySelectorAll('tbody tr').forEach(tr => {
      tr.addEventListener('click', () => selectStudentRow(tr.dataset.roll));
    });
  }

  const stuTabBtns = document.querySelectorAll('.stu-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  stuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      stuTabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-content-${tabId}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });


  // ==========================================================================
  // SCREENSHOT MATCH LINE GRAPH & DEPARTMENT BUTTON LOGIC (X=40, 130, 220, 310, 400, 490)
  // ==========================================================================
  const btnGraphDepts = document.querySelectorAll('.btn-graph-dept');
  const svgScrollMainPath = document.getElementById('svg-scroll-main-path');
  const graphHeaderTitle = document.getElementById('graph-header-title');
  const breakdownCardTitle = document.getElementById('breakdown-card-title');

  const valClass1st = document.getElementById('val-class-1st');
  const valClass2nd = document.getElementById('val-class-2nd');
  const valClass3rd = document.getElementById('val-class-3rd');

  const deptGraphData = {
    overall: {
      title: "YEAR WISE ACADEMIC PASS (%)",
      cardTitle: "OVERALL DEPARTMENT CLASS PASS PERCENTAGE BREAKDOWN",
      path: "M 40 34 L 130 115 L 220 24 L 310 20 L 400 14 L 490 10",
      nodePos: [
        { cy: 34, ty: 22 },
        { cy: 115, ty: 103 },
        { cy: 24, ty: 12 },
        { cy: 20, ty: 8 },
        { cy: 14, ty: 4 },
        { cy: 10, ty: 2 }
      ],
      nearVals: ["84%", "68% (Less)", "91%", "94%", "97%", "98%"],
      c1: "95.4%", c2: "97.8%", c3: "98.9%"
    },
    bca: {
      title: "BCA — YEAR WISE ACADEMIC PASS (%)",
      cardTitle: "BCA DEPARTMENT CLASS PASS PERCENTAGE BREAKDOWN",
      path: "M 40 28 L 130 108 L 220 20 L 310 16 L 400 10 L 490 6",
      nodePos: [
        { cy: 28, ty: 16 },
        { cy: 108, ty: 96 },
        { cy: 20, ty: 8 },
        { cy: 16, ty: 4 },
        { cy: 10, ty: 2 },
        { cy: 6, ty: 1 }
      ],
      nearVals: ["88%", "72% (Less)", "93%", "96%", "98%", "99%"],
      c1: "98.2%", c2: "98.8%", c3: "99.0%"
    },
    bcom: {
      title: "B.COM — YEAR WISE ACADEMIC PASS (%)",
      cardTitle: "B.COM DEPARTMENT CLASS PASS PERCENTAGE BREAKDOWN",
      path: "M 40 42 L 130 124 L 220 32 L 310 26 L 400 18 L 490 14",
      nodePos: [
        { cy: 42, ty: 30 },
        { cy: 124, ty: 112 },
        { cy: 32, ty: 20 },
        { cy: 26, ty: 14 },
        { cy: 18, ty: 6 },
        { cy: 14, ty: 2 }
      ],
      nearVals: ["82%", "65% (Less)", "89%", "92%", "96%", "97%"],
      c1: "94.1%", c2: "96.5%", c3: "97.6%"
    },
    bba: {
      title: "BBA — YEAR WISE ACADEMIC PASS (%)",
      cardTitle: "BBA DEPARTMENT CLASS PASS PERCENTAGE BREAKDOWN",
      path: "M 40 48 L 130 130 L 220 38 L 310 30 L 400 22 L 490 18",
      nodePos: [
        { cy: 48, ty: 36 },
        { cy: 130, ty: 118 },
        { cy: 38, ty: 26 },
        { cy: 30, ty: 18 },
        { cy: 22, ty: 10 },
        { cy: 18, ty: 6 }
      ],
      nearVals: ["80%", "62% (Less)", "88%", "91%", "95%", "96%"],
      c1: "93.5%", c2: "95.8%", c3: "96.9%"
    }
  };

  btnGraphDepts.forEach(btn => {
    btn.addEventListener('click', () => {
      btnGraphDepts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const dept = btn.dataset.graphDept;
      const data = deptGraphData[dept];

      if (data) {
        if (graphHeaderTitle) graphHeaderTitle.textContent = data.title;
        if (breakdownCardTitle) breakdownCardTitle.innerHTML = `<i class="fa-solid fa-sitemap text-blue"></i> ${data.cardTitle}`;

        if (svgScrollMainPath) svgScrollMainPath.setAttribute('d', data.path);

        // Update Nearwise Values & Vertical Positions Above Nodes
        data.nearVals.forEach((val, idx) => {
          const node = document.getElementById(`node-point-${idx + 1}`);
          if (node) {
            const circle = node.querySelector('circle');
            const txt = node.querySelector('.point-near-val-screenshot');
            if (circle && data.nodePos[idx]) circle.setAttribute('cy', data.nodePos[idx].cy);
            if (txt && data.nodePos[idx]) {
              txt.textContent = val;
              txt.setAttribute('y', data.nodePos[idx].ty);
            }
          }
        });

        if (valClass1st) valClass1st.textContent = data.c1;
        if (valClass2nd) valClass2nd.textContent = data.c2;
        if (valClass3rd) valClass3rd.textContent = data.c3;

        showToast(`Loaded ${dept.toUpperCase()} Academic Line Graph & Class Breakdown`, 'success');
      }
    });
  });


  // ==========================================================================
  // COMPLAINTS VIEW
  // ==========================================================================
  const complaintsTableBody = document.getElementById('complaints-table-body');
  const kpiTotalComplaints = document.getElementById('kpi-total-complaints');
  const kpiPendingComplaints = document.getElementById('kpi-pending-complaints');
  const kpiReviewComplaints = document.getElementById('kpi-review-complaints');
  const kpiResolvedComplaints = document.getElementById('kpi-resolved-complaints');

  function renderComplaintsTable() {
    if (!complaintsTableBody) return;
    complaintsTableBody.innerHTML = '';

    let total = state.complaintsList.length;
    let pending = 0;
    let review = 0;
    let resolved = 0;

    state.complaintsList.forEach(cmp => {
      if (cmp.status === 'Pending') pending++;
      if (cmp.status === 'In Review') review++;
      if (cmp.status === 'Resolved') resolved++;

      let badgeClass = 'badge-pending';
      if (cmp.status === 'In Review') badgeClass = 'badge-review';
      if (cmp.status === 'Resolved') badgeClass = 'badge-resolved';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${cmp.id}</strong></td>
        <td>${cmp.student}</td>
        <td>${cmp.roll}</td>
        <td>${cmp.dept}</td>
        <td>${cmp.category}</td>
        <td>${cmp.subject}</td>
        <td>${cmp.date}</td>
        <td><span class="badge ${badgeClass}">${cmp.status}</span></td>
        <td>
          ${cmp.status === 'Resolved'
            ? `<button class="btn-action-sm btn-done-action" disabled>Resolved</button>`
            : `<button class="btn-action-sm btn-resolve-action" data-cmp="${cmp.id}">Resolve</button>`
          }
        </td>
      `;
      complaintsTableBody.appendChild(tr);
    });

    if (kpiTotalComplaints) kpiTotalComplaints.textContent = total;
    if (kpiPendingComplaints) kpiPendingComplaints.textContent = pending;
    if (kpiReviewComplaints) kpiReviewComplaints.textContent = review;
    if (kpiResolvedComplaints) kpiResolvedComplaints.textContent = resolved;

    document.querySelectorAll('.btn-resolve-action').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.cmp;
        const targetCmp = state.complaintsList.find(c => c.id === id);
        if (targetCmp) {
          targetCmp.status = 'Resolved';
          renderComplaintsTable();
          showToast(`Grievance ${id} marked as Resolved!`, 'success');
        }
      };
    });
  }

  renderComplaintsTable();

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // Default setup with URL query parameter support
  const urlRole = new URLSearchParams(window.location.search).get('role');
  configureRole(urlRole && roleCredentials[urlRole] ? urlRole : 'admin');

});
