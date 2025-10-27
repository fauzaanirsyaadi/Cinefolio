import { HomeRoll } from '@/components/home-roll'
import { createClient } from '@/lib/supabase/server'

// Pastikan halaman tidak di-prerender statis
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
    const supabase = await createClient()

    // Fallback dummy — agar UI tetap tampil jika DB kosong/gagal
    const fallbackProjects = [
        {
            slug: 'midnight-echo',
            title: 'Midnight Echo',
            category: 'Feature Film',
            shortDescription: 'Thriller psikologis berlatar malam kota.',
            coverImage:
                'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1920&auto=format&fit=crop',
        },
        {
            slug: 'salt-and-smoke',
            title: 'Salt & Smoke',
            category: 'Documentary',
            shortDescription: 'Komunitas nelayan pesisir dan perubahan iklim.',
            coverImage:
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
        },
        {
            slug: 'paper-stars',
            title: 'Paper Stars',
            category: 'Short Film',
            shortDescription: 'Coming-of-age bernuansa retro.',
            coverImage:
                'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=1920&auto=format&fit=crop',
        },
        {
            slug: 'neon-boulevard',
            title: 'Neon Boulevard',
            category: 'Music Video',
            shortDescription: 'Cyberpunk neon choreography.',
            coverImage:
                'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop',
        },
        {
            slug: 'the-last-frame',
            title: 'The Last Frame',
            category: 'Commercial',
            shortDescription: 'Iklan sinematik kamera analog.',
            coverImage:
                'https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=1920&auto=format&fit=crop',
        },
        {
            slug: 'outsider-freud',
            title: 'Outsider Freud',
            category: 'Documentary',
            shortDescription: '—',
            coverImage:
                'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1920&auto=format&fit=crop',
        },
    ] as const

    try {
        // Catatan: jika kolom 'created_at' tidak ada, ORDER BY ini bisa gagal.
        // Anda bisa ganti ke 'id' jika tabel punya kolom itu.
        const { data, error } = await (supabase
            .from('projects')
            .select('slug, title, category, shortDescription, coverImage')
            .order('created_at', { ascending: false })
            .limit(12))

        // Logging untuk debugging server-side
        console.log('[Home] Supabase select projects → error:', error)
        console.log('[Home] Supabase select projects → count:', Array.isArray(data) ? data.length : null)

        // Jika ORDER BY gagal (mis. kolom tidak ada), coba ulang tanpa ORDER
        if (error && /created_at/i.test(error.message || '')) {
            const retry = await supabase
                .from('projects')
                .select('slug, title, category, shortDescription, coverImage')
                .limit(12)

            console.log('[Home] Retry without ORDER → error:', retry.error)
            console.log('[Home] Retry without ORDER → count:', Array.isArray(retry.data) ? retry.data.length : null)

            const items = (retry.data && retry.data.length ? retry.data : fallbackProjects) as any
            return (
                <main className="relative">
                    <HomeRoll items={items} />
                </main>
            )
        }

        const items = (data && data.length ? data : fallbackProjects) as any
        return (
            <main className="relative">
                <HomeRoll items={items} />
            </main>
        )
    } catch (e: any) {
        console.error('[Home] Unexpected error fetching projects:', e)
        return (
            <main className="relative">
                <HomeRoll items={fallbackProjects as any} />
            </main>
        )
    }
}