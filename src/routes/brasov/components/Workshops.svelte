<script lang="ts">
    // Sponsors Configuration - disable this if you don't have any sponsors to display!

    const workshops = [
        {
            name: 'Introducere în programare',
            duration: '3 ore',
            date: '3 Septembrie, 13:00',
            description: 'Curs pentru începători fără experiență în IT. Se explică bazele programării în C#, concepte fundamentale și cum să gândești algoritmic. Menit pentru cei care nu au experiență în programare, dar doresc să învețe.'
        },
        {
            name: 'Modelare 3D în Blender',
            duration: '2 ore',
            date: '4 Septembrie, 13:00',
            description: 'Curs introductiv pentru modelarea în Blender. Nu este nevoie de cunoștințe anterioare. Poate fi foarte folositor pentru dezvoltarea jocurilor 3D.'

        },
        {
            name: 'Unity curs I',
            duration: '3 ore',
            date: '5 Septembrie, 13:00',
            description: 'Introducere în Unity și game development. Vei învăța cum să folosești Unity Game Engine, te vei familiariza cu interfața și vei învăța să faci scene și să imporți modele.'
        },
        {
            name: 'Unity curs II',
            duration: '3 ore',
            date: '8 Septembrie, 13:00',
            description: 'Scripting în Unity. Este nevoie de cunoștințe referitoare la folosirea Unity și cunoștințe de bază despre programare și ale limbajului C#. Vei învăța cum să faci modelele din Unity să se miște și să interacționeze unele cu altele folosind limbajul C#.'
        },
        {
            name: 'Unity curs III',
            duration: '2 ore',
            date: '9 Septembrie, 15:00',
            description: 'O continuare a cursului Unity II'
        }
    ];
</script>

<!-- Second Billboard Section -->
<div class="w-full bg-[#FCEFC5] pb-16 pt-6 px-8 flex justify-center">
    <div class="relative max-w-4xl w-full">
        <!-- Billboard Container -->
        <div
                class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40">
            <!-- Header Section -->
            <div class="w-full bg-[url('/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative"
                 style="border-bottom: 8px solid #B4B4C5;">
                <h2 class="text-4xl font-serif text-[#F0F0FF] text-center">
                    Workshopuri (încheiate)
                </h2>
                <!-- Brush texture overlay for header -->
                <div
                        class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>
            </div>

            <!-- Main Content Area -->
            <div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
                <!-- Brush texture overlay for content -->
                <div
                        class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

                <!-- Sponsors Grid -->
                <div class="relative z-10 min-h-40 flex flex-col gap-6">

                    {#each workshops as workshop}
                        <div
                                class="bg-white/20 rounded-lg p-4 w-full flex items-start transition-colors flex-col"
                        >
                            <div class="flex justify-between w-full">
                                <h3 class="text-2xl font-sans font-bold text-[#335969] mb-4 text-center max-sm:text-xl max-sm:px-4">
                                    {workshop.name} ({workshop.duration})
                                </h3>
                                <p class="text-lg font-sans text-[#477783]">{workshop.date}</p>
                            </div>
                            <p class="text-[#335969] opacity-70">{workshop.description}</p>
                        </div>
                    {/each}
                </div>
                <!-- {#if workshopSignUpURL}
                    <div class="mt-8 text-center">
                        <p class="text-lg text-[#335969]"><a href={workshopSignUpURL}
                                                                                                 class="underline hover:text-[#477783] transition-colors">Aici</a>
                            găsești mai multe detalii și un formular de înscriere.
                        </p>
                    </div>
                {/if} -->
            </div>

            <!-- Billboard Bars (bottom) -->
            <div
                    class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
            ></div>
        </div>

        <!-- Connecting Pillars to First Billboard -->
        <div
                class="absolute top-0 left-[15%] w-[10vw] max-w-12 h-32 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
                style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
        ></div>
        <div
                class="absolute top-0 right-[15%] w-[10vw] max-w-12 h-32 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
                style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
        ></div>

        <!-- Billboard Pillars (extending down from bottom) -->
        <div
                class="absolute bottom-0 left-[15%] w-[10vw] max-w-12 h-24 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
                style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
        >
            <div
                    class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
        </div>
        <div
                class="absolute bottom-0 right-[15%] w-[10vw] max-w-12 h-24 bg-[url('/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
                style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
        >
            <div
                    class="absolute bottom-0 left-0 w-full h-auto bg-[url('/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"></div>
        </div>
    </div>
</div>