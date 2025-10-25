import { getIronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export interface SessionData extends IronSessionData {
  isLoggedIn: boolean;
  email: string;
}

export const sessionOptions = {
  cookieName: 'cinefolio_session',
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

export async function login(email: string) {
  const session = await getSession();
  session.isLoggedIn = true;
  session.email = email;
  await session.save();
  revalidatePath('/');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath('/');
}

export async function getUser() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return null;
  }
  return {
    email: session.email,
  };
}

async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
  
  if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
  }
  
  return data as Project;
}
