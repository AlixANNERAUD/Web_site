# Archives détaillées des projets

Retrouvez ici les descriptions complètes des projets présentés dans le [catalogue](/fr/projects).

## <Palette /> Personnels

<PortfolioProjectDetail project-id="xila" lang="fr">
Un système d'exploitation léger pour microcontrôleurs (principalement ESP32-S3), entièrement réécrit depuis une architecture C++/Berry vers une pile moderne Rust/WebAssembly. Le noyau en Rust gère l'abstraction matérielle et l'ordonnancement des tâches, tandis qu'un runtime WASM intégré offre un écosystème d'applications bac à sable, indépendant du langage, permettant des performances proches du natif avec une sûreté mémoire garantie à la compilation.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="infrastructure" lang="fr">
Infrastructure auto-hébergée pour moi-même, ma famille et mes amis (voir <a href="https://anneraud.fr">anneraud.fr</a>), gérée avec Docker et Ansible. Les services incluent <a href="https://nextcloud.com/">Nextcloud</a>, <a href="https://matrix.org/">Matrix</a>, <a href="https://bitwarden.com/">Bitwarden</a>, <a href="https://jellyfin.org/">Jellyfin</a>, <a href="https://about.gitea.com/">Gitea</a> et bien d'autres, animée par une conviction forte en faveur de la souveraineté des données.
L'intégralité du stack repose sur Debian (Linux), mon système d'exploitation de prédilection pour sa stabilité et son efficacité, aussi bien en tant que base serveur que pour mes PC personnels.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="mini-train-store" lang="fr">
Pour moderniser le commerce de trains miniatures de mon père, j'ai développé et déployé une solution e-commerce complète basée sur Odoo (voir <a href="https://www.minitrainstore.fr">minitrainstore.fr</a>). La plateforme est auto-hébergée sur un serveur que je gère. En complément de la boutique, j'ai développé une extension de navigateur sur mesure pour synchroniser l'inventaire directement depuis son compte <a href="https://www.leboncoin.fr">leboncoin.fr</a>, simplifiant sa gestion quotidienne des stocks.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="model-railway" lang="fr">
Depuis 2019, je construis un réseau ferroviaire miniature à l'échelle <a href="https://en.wikipedia.org/wiki/HO_scale">HO</a> avec commande numérique <a href="https://en.wikipedia.org/wiki/Digital_Command_Control">DCC</a>. Je conçois et fabrique toute l'électronique moi-même, circuits de détection d'occupation de canton et cartes de commande de signaux, alliant conception matérielle et logiciel embarqué pour une signalisation automatisée.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="connected-speaker" lang="fr">
Conception d'un système de télécommande sans fil pour un amplificateur hi-fi basé sur TDA7294, à l'aide d'un ESP32 et de composants disponibles dans le commerce. L'ESP32 héberge une interface web permettant de contrôler le volume, la sélection d'entrée et l'alimentation depuis n'importe quel appareil sur le réseau local.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="dera" lang="fr">
Une plateforme respectueuse de la vie privée offrant des services partagés aux étudiants de l'INSA Rouen Normandie : agenda, messagerie instantanée et réseau social. Auto-hébergée et développée en Rust pour les performances et la fiabilité.
</PortfolioProjectDetail>

Je contribue également à de nombreux projets open-source par l'intermédiaire de Pull Requests sur GitHub, n'hésitez pas à consulter <a href="https://github.com/AlixANNERAUD">mon profil GitHub</a>.

## <Blocks /> Bibliothèques open source

<PortfolioProjectDetail project-id="lvgl-theme-shadcn" lang="fr">
Bibliothèque C99 compatible avec LVGL 9 proposant une identité visuelle inspirée de shadcn/ui pour les interfaces embarquées. Elle définit des palettes claires et sombres, des styles de composants et des variantes adaptées aux petits écrans et aux contrôles tactiles. Des bindings Rust `no_std` et des exemples de rendu accompagnent la bibliothèque. [Code et galerie](https://github.com/AlixANNERAUD/lvgl_theme_shadcn).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="nanoexpr" lang="fr">
Évaluateur d'expressions mathématiques `no_std` pour microcontrôleurs, fonctionnant sans allocation dynamique. Son analyseur traite les expressions sans construire d'arbre syntaxique sur le tas ; il limite la profondeur d'imbrication et signale les erreurs précisément. La bibliothèque prend en charge différents types numériques, des fonctions et des variables. [Code et documentation](https://github.com/AlixANNERAUD/nanoexpr).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="nanoaudio" lang="fr">
Bibliothèque Rust `no_std` de traitement audio à mémoire maîtrisée. Elle inclut conversion PCM, mixage, variation du volume, buffers circulaires pour le DMA et plusieurs codecs. Les fonctions travaillent avec des buffers fournis par l'appelant et sont destinées à être intégrées à des pilotes ou à un OS. [Code et exemples](https://github.com/AlixANNERAUD/nanoaudio).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="embedded-i18n" lang="fr">
Outil d'internationalisation pour firmware Rust : les traductions sont résolues à la compilation et intégrées en ROM, sans parseur ni allocation au runtime. Les macros vérifient les clés et les paramètres de format, avec gestion des pluriels et plusieurs formats de fichiers. [Code et guide](https://github.com/AlixANNERAUD/embedded-i18n).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="getargs-derive" lang="fr">
Macros procédurales Rust pour décrire des interfaces en ligne de commande avec une syntaxe proche de Clap, tout en ciblant `no_std`. L'analyse des arguments et la génération des messages d'aide peuvent fonctionner sans allocation dynamique. [Code et exemples](https://github.com/AlixANNERAUD/getargs-derive).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="battery-percent" lang="fr">
Petite bibliothèque C99 et Rust `no_std` qui estime l'état de charge d'une batterie à partir de courbes de décharge et de mesures de tension. Elle gère diverses chimies, les packs en série ainsi que le lissage des mesures ADC, sans dépendance à un microcontrôleur spécifique. [Code et courbes](https://github.com/AlixANNERAUD/battery-percent).
</PortfolioProjectDetail>

## <Trophy /> Compétitions

<PortfolioProjectDetail project-id="jeanne-hack-2026" lang="fr">
Équipe "#JeSuisAlix" : <a href="https://www.jeanne-hack-ctf.org/post/2026/">1ère place au classement général (égalité avec 2 autres équipes)</a>.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="codinsa-2025" lang="fr">
Équipe INSA Rouen : <a href="https://codinsa.org/static/past">1ère place au classement général</a>.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="jeanne-hack-2025" lang="fr">
Équipe "Les Schtroumpfs" : <a href="https://www.jeanne-hack-ctf.org/post/2025/">3ème place au classement général</a>.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="tracs-2024" lang="fr">
Équipe "Les Schtroumpfs" : <a href="https://tracs.viarezo.fr/edition_results/show_student_ranking/2024/">36ème place au classement général</a>.
</PortfolioProjectDetail>

## <GraduationCap /> Scolaires

<PortfolioProjectDetail project-id="deez-nalyzer" lang="fr">
Développement d'une application web full-stack intégrant l'API Deezer pour extraire les caractéristiques audio d'extraits MP3. Entraînement et comparaison de modèles de machine learning pour classifier les genres musicaux et générer des playlists thématiques.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="eogm" lang="fr">
Basé sur le <a href="https://www.researchgate.net/publication/337171728_25D_Evidential_Grids_for_Dynamic_Object_Detection">document de recherche de notre professeur sur l'application pratique de la théorie de Dempster-Shafer en robotique</a>, nous avons développé un algorithme en temps réel qui crée des cartes d'espaces libres et occupés dans l'environnement d'un robot en utilisant des capteurs LiDAR, IMU et GPS embarqués. Il a été développé pour le <a href="https://en.wikipedia.org/wiki/Robot_Operating_System">Robot Operating System (ROS)</a>. Il est rapide et efficace grâce à diverses optimisations de mémoire, techniques de vectorisation et de parallélisation.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="iti-adventure" lang="fr">
Un jeu de rôle textuel développé en Java, appliquant les principes de la POO à travers des hiérarchies d'héritage pour les personnages et les objets, un système d'événements modulaire et des patrons de conception tels que Strategy et Observer.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="huffman" lang="fr">
Implémentation d'un compresseur/décompresseur Huffman de zéro en C, couvrant la construction de l'arbre, l'encodage canonique et les entrées/sorties de flux de bits, un exercice en structures de données, manipulation de bits et gestion de fichiers.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="robot-mouche" lang="fr">
Conception et programmation en C++ d'un robot polyvalent : il peut être piloté à distance via WiFi ou fonctionner de manière autonome en suivant une ligne et en évitant les obstacles grâce à un capteur LiDAR et une caméra.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="music-danceability" lang="fr">
Un projet d'équipe en science des données utilisant l'API Spotify : construction et comparaison de plusieurs modèles de machine learning pour prédire le score de dansabilité d'un titre à partir de ses caractéristiques audio, incluant l'ingénierie de variables et l'évaluation des modèles.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="insatram" lang="fr">
Un jeu de gestion de réseau de tramway développé en Free Pascal avec SDL 1.2, intégrant la planification des lignes, la simulation du flux de passagers et la gestion des ressources.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="linear-equations" lang="fr">
Une implémentation en C de l'élimination gaussienne avec pivot partiel pour résoudre des systèmes d'équations linéaires arbitraires.
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="odor-localization" lang="fr">
Travail exploratoire lié à mon stage de recherche à NYU sur la localisation de sources de gaz. Le dépôt présente notamment une architecture associant capteurs MQ, ESP32, publication MQTT et traitement côté serveur. La documentation reste partielle : il s'agit d'un prototype de recherche, et non d'un produit finalisé. [Dépôt de recherche](https://github.com/AlixANNERAUD/Odor_localization).
</PortfolioProjectDetail>

<PortfolioProjectDetail project-id="medical-image-deep-learning" lang="fr">
Projet de segmentation et de classification d'images histopathologiques. Le dépôt regroupe des scripts de préparation de données et d'entraînement pour nnU-Net, CellViT++ et HoVer-Net, notamment avec orchestration SLURM. Ce travail illustre l'intégration et l'expérimentation de plusieurs architectures de deep learning plutôt que le développement d'un nouveau modèle à partir de zéro. [Code et protocole](https://github.com/AlixANNERAUD/Deep_learning_project).
</PortfolioProjectDetail>
