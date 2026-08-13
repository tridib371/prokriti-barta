import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-bg flex flex-col items-center justify-center text-center p-4">
      <span className="font-display font-bold text-6xl text-accent">404</span>
      <h1 className="font-display font-bold text-2xl text-primary mt-2">পেজটি পাওয়া যায়নি</h1>
      <p className="text-xs text-muted max-w-xs font-bn-sans mt-2 mb-6">
        আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল।
      </p>
      <AlponaDivider className="my-4 max-w-md" />
      <Link to="/">
        <Button variant="accent" size="lg" className="gap-2">
          <Home size={18} /> মূল পাতায় ফিরে যান
        </Button>
      </Link>
    </div>
  );
}
