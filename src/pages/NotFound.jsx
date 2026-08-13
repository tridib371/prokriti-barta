import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] bg-bg flex flex-col items-center justify-center text-center p-4">
      <span className="font-display font-bold text-6xl text-accent">404</span>
      <h1 className="font-display font-bold text-2xl text-primary mt-2">{t('notfound.title')}</h1>
      <p className="text-xs text-muted max-w-xs font-bn-sans mt-2 mb-6">
        {t('notfound.sub')}
      </p>
      <AlponaDivider className="my-4 max-w-md" />
      <Link to="/">
        <Button variant="accent" size="lg" className="gap-2">
          <Home size={18} /> {t('btn.backToHome')}
        </Button>
      </Link>
    </div>
  );
}
