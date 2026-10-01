import "./style.css";

const studentIds = [
    "student-001",
    "student-002",
    "student-003",
    "student-004",
    "student-005"
];

async function getStudent(studentId) {
    try {
        const response = await fetch(`/students/${studentId}.json`);

        if (!response.ok) {
            throw new Error(`Data ${studentId} tidak ditemukan`);
        }

        return await response.json();

    } catch (error) {
        console.error(error);

        return {
            nama: "Data tidak ditemukan",
            absen: "-",
            kelas: "-"
        };
    }
}

async function loadStudents() {
    const students = await Promise.all(
        studentIds.map(studentId => getStudent(studentId))
    );

    document.querySelector("#app").innerHTML = `
        <header class="header">
            <div class="container">

                <p class="badge">
                    GIT & GITHUB PRACTICE
                </p>

                <h1>Team Dashboard</h1>

                <p class="subtitle">
                    From Students For Students.
                </p>

            </div>
        </header>

        <main class="container">

            <section class="overview">

                <div>
                    <p class="section-label">
                        PROJECT
                    </p>

                    <h2>
                        Pelatihan Git & GitHub.
                    </h2>

                    <p>
                    
                    </p>
                </div>

                <div class="total">
                    <strong>${students.length}</strong>
                    <span>Anggota</span>
                </div>

            </section>

            <section class="team">

                <div class="section-heading">

                    <div>
                        <p class="section-label">
                            TEAM MEMBERS
                        </p>

                        <h2>
                            Identitas Anggota
                        </h2>
                    </div>

                </div>

                <div class="members">

                    ${students.map((student, index) => `
                        <article class="member-card">

                            <div class="member-number">
                                ${String(index + 1).padStart(2, "0")}
                            </div>

                            <div class="member-content">

                                <h3>
                                    ${student.nama}
                                </h3>

                                <div class="identity">

                                    <div>
                                        <span>
                                            ABSEN
                                        </span>

                                        <strong>
                                            ${student.absen}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            KELAS
                                        </span>

                                        <strong>
                                            ${student.kelas}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        </article>
                    `).join("")}

                </div>

            </section>

        </main>

        <footer>
            Git Collaboration Dashboard
        </footer>
    `;
}

loadStudents();