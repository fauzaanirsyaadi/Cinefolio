'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/types';

// We need a slightly different type for the dashboard, as galleryImages and coverImage will be just URLs
type DashboardProject = Omit<Project, 'coverImage' | 'galleryImages'> & {
  coverImage: string;
  galleryImages: string[];
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch projects. Make sure you have created the "projects" table in Supabase.',
        variant: 'destructive',
      });
    } else {
        // The data from supabase might not match the shape of our project type, so we map it.
        const formattedProjects = data.map((p: any) => ({
        ...p,
        // Assuming coverImage and galleryImages are stored as text/json
        coverImage: typeof p.coverImage === 'string' ? p.coverImage : '',
        galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : [],
        })) as DashboardProject[];
      setProjects(formattedProjects);
    }
    setLoading(false);
  }

  async function deleteProject(id: number) {
    const { error } = await supabase.from('projects').delete().match({ id });
    if (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Project deleted successfully.',
      });
      fetchProjects();
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-24 animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/dashboard/edit/${project.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProject(project.id)} className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12">
                  No projects found. Create one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
