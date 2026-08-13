import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('pb_cart');
      localStorage.removeItem('pb_wishlist');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center p-6">
          <div className="bg-surface border border-line p-8 rounded-3xl max-w-md w-full shadow-lg space-y-4">
            <div className="w-16 h-16 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto font-bold text-2xl">
              !
            </div>
            <h2 className="font-display font-bold text-2xl text-primary">
              কিছু সমস্যা হয়েছে / Something went wrong
            </h2>
            <p className="text-xs text-muted font-mono bg-bg p-3 rounded-xl border border-line text-left overflow-auto max-h-32">
              {this.state.error?.toString() || 'Unknown error'}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-primary text-surface rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm"
            >
              পুনরায় চেষ্টা করুন / Reset & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
