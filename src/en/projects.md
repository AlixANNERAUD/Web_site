# Projects

A selection of personal, academic, and competitive projects reflecting my interests and technical background.

## <Palette /> Personal

<Project badge="Ongoing" title="Xila" date="2019 - Present" link="https://www.xila.dev" :tags="['Rust', 'WebAssembly']">
A lightweight operating system for microcontrollers (primarily ESP32-S3), fully rewritten from a legacy C++/Berry architecture to a modern Rust/WebAssembly stack. The Rust core handles hardware abstraction and task scheduling, while a built-in WASM runtime provides a sandboxed, language-agnostic application ecosystem, enabling near-native performance with memory safety enforced at compile time.
</Project>

<Project badge="Ongoing" title="Infrastructure" date="2020 - Present" link="https://github.com/AlixANNERAUD/Infrastructure" :tags="['Docker', 'Ansible']">
Self-hosted infrastructure for myself, family, and friends (see <a href="https://anneraud.fr">anneraud.fr</a>), managed with Docker and Ansible. Services include <a href="https://nextcloud.com/">Nextcloud</a>, <a href="https://matrix.org/">Matrix</a>, <a href="https://bitwarden.com/">Bitwarden</a>, <a href="https://jellyfin.org/">Jellyfin</a>, <a href="https://about.gitea.com/">Gitea</a> and more, driven by a strong belief in data sovereignty.
</Project>

<Project badge="Ongoing" title="Mini Train Store" date="2020 - Present" link="https://github.com/AlixANNERAUD/MiniTrainStore" :tags="['Odoo', 'Docker', 'Vue.js', 'Wxt', 'Tailwind', 'PostgreSQL']">
To modernize my father’s miniature train business, I developed and deployed a comprehensive e-commerce solution based on Odoo (see <a href="https://www.minitrainstore.fr">minitrainstore.fr</a>). The platform is self-hosted on a server I manage. In addition to the storefront, I built a custom browser extension to synchronize inventory directly from his <a href="https://www.leboncoin.fr">leboncoin.fr</a> account, streamlining his daily stock management.
</Project>

<Project badge="Ongoing" title="Model railway network" date="2019 - Present">
Since 2019, I've been building an <a href="https://en.wikipedia.org/wiki/HO_scale">HO-scale</a> model railway layout with full <a href="https://en.wikipedia.org/wiki/Digital_Command_Control">DCC</a> control. I design and build all the electronics myself, including block occupancy detection circuits and signal control boards, combining hardware design with embedded software for automated signaling.
</Project>

<Project title="Connected speaker" date="2023" link="https://github.com/AlixANNERAUD/Connected_speaker" :tags="['C++', 'JavaScript']">
Built a wireless remote control system for a TDA7294-based hi-fi amplifier using an ESP32 and off-the-shelf components. The ESP32 hosts a web interface to control volume, input selection, and power from any device on the local network.
</Project>

<Project title="dera.page" date="2022 - Present" link="https://dera.page" :tags="['Rust', 'Docker']">
A privacy-respecting platform offering shared services to INSA Rouen Normandie students: calendar, instant messaging, and a social network. Self-hosted and built in Rust for performance and reliability.
</Project>

I also contribute to many open-source projects through GitHub Pull Requests, feel free to check out <a href="https://github.com/AlixANNERAUD">my GitHub profile</a>.

## <Trophy /> Competitions

<Project badge="CTF" title="Jeanne d'Hack CTF (University of Rouen)" date="2026" link="https://www.jeanne-hack-ctf.org/post/">
Team "#JeSuisAlix": <a href="https://www.jeanne-hack-ctf.org/post/2026/">1st place in the general ranking (tie with 2 other teams)</a>.
</Project>

<Project badge="Competitive programming" title="Cod'INSA" date="2025" link="https://codinsa.org/">
Team INSA Rouen : <a href="https://codinsa.org/static/past">1st place in the general ranking</a>.
</Project>

<Project badge="CTF" title="Jeanne d'Hack CTF (University of Rouen)" date="2025" link="https://www.jeanne-hack-ctf.org/post/">
Team "Les Schtroumpfs": <a href="https://www.jeanne-hack-ctf.org/post/2025/">3rd place in the general ranking</a>.
</Project>

<Project badge="CTF" title="TRACS (DGSE)" date="2024" link="https://tracs.viarezo.fr/">
Team "Les Schtroumpfs": <a href="https://tracs.viarezo.fr/edition_results/show_student_ranking/2024/">36th place in the general ranking</a>.
</Project>

## <GraduationCap /> School

<Project title="ThéraPIC" date="2025" :tags="['Django', 'Vue.js', 'NLP']">
Project Manager in an agile team as part of the Certified INSA Projects (PIC). Development of an application for pharmacists at <a href="https://www.becquerel.fr/">Centre Henri Becquerel</a> to semi-automate the management of medication prescriptions. This project involves the use of structured data and the enhancement of unstructured data through natural language processing (identifying diseases, medications, etc. in reports, etc.).
</Project>

<Project title="Deez'Nalyzer" date="2024" link="https://github.com/AlixANNERAUD/Deez_Nalyzer" :tags="['Django', 'Vue.js', 'ML']">
Built a full-stack web application integrating the Deezer API to extract audio features from MP3 excerpts. Trained and compared machine learning models to classify song genres and generate thematic playlists.
</Project>

<Project title="Evidential Occupancy Grid Map (EOGM)" date="2024" link="https://github.com/AlixANNERAUD/Evidential_occupancy_map" :tags="['C++', 'ROS']">
Based on our professor's <a href="https://www.researchgate.net/publication/337171728_25D_Evidential_Grids_for_Dynamic_Object_Detection">research paper on pratical application of the Dempster-Shafer theory in robotics</a>, we developed a real-time algorithm that creates maps of free and occupied spaces in a robot's environment using onboard LiDAR, IMU and GPS sensors. It was developed for <a href="https://en.wikipedia.org/wiki/Robot_Operating_System">Robot Operating System (ROS)</a>. It's fast and efficient due to various memory optimizations, vectorization and parallelization techniques.
</Project>

<Project title="ITI Adventure" date="2024" link="https://github.com/AlixANNERAUD/ITI_aventure" :tags="['Java']">
A text-based RPG developed in Java, applying OOP principles through inheritance hierarchies for characters and items, a modular event system, and design patterns such as Strategy and Observer.
</Project>

<Project title="Huffman (de)compressor" date="2023" link="https://github.com/AlixANNERAUD/Huffman_compressor" :tags="['C']">
Implemented a Huffman (de)compressor from scratch in C, covering tree construction, canonical encoding, and bitstream I/O, an exercise in data structures, bit manipulation, and file handling.
</Project>

<Project title="Robot mouche" date="2023" link="https://github.com/AlixANNERAUD/Robot_Mouche" :tags="['C++']">
Designed and programmed a versatile robot in C++: it can be driven remotely via WiFi or operate autonomously, following a line and avoiding obstacles using a LiDAR sensor and a camera.
</Project>

<Project title="Music danceability" date="2023" link="https://github.com/AlixANNERAUD/Music_danceability_prediction" :tags="['Python']">
A data science team project using the Spotify API: we built and compared several ML models to predict a track's danceability score from audio features, including feature engineering and model evaluation.
</Project>

<Project title="INSAtram" date="2022" link="https://github.com/AlixANNERAUD/INSAtram" :tags="['Free pascal']">
A tram network management game built in Free Pascal with SDL 1.2, featuring route planning, passenger flow simulation, and resource management.
</Project>

<Project title="System of linear equations calculator" date="2022" link="https://github.com/AlixANNERAUD/System_of_linear_equations_solver" :tags="['C']">
A C implementation of Gaussian elimination with partial pivoting to solve arbitrary systems of linear equations.
</Project>
