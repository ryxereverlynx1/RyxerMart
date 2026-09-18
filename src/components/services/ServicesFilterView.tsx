"use client";

import React, { useState, useMemo } from "react";
import { ServiceDTO, CategoryDTO } from "@/types";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Search, X, Star, RotateCcw } from "lucide-react";

interface ServicesFilterViewProps {
  initialServices: ServiceDTO[];
  categories: CategoryDTO[];
}

export function ServicesFilterView({
  initialServices,
  categories,
}: ServicesFilterViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricingType, setSelectedPricingType] = useState("all");
  const [sortBy, setSortBy] = useState<"recommended" | "price_asc" | "price_desc" | "newest">("recommended");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredServices = useMemo(() => {
    return initialServices
      .filter((service) => {
        // Category filter
        if (selectedCategory !== "all" && service.category?.slug !== selectedCategory) {
          return false;
        }

        // Pricing type filter
        if (selectedPricingType !== "all" && service.pricingType !== selectedPricingType) {
          return false;
        }

        // Featured only
        if (featuredOnly && !service.featured) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = service.name.toLowerCase().includes(q);
          const matchDesc = service.shortDescription.toLowerCase().includes(q);
          const matchTags = service.tags?.toLowerCase().includes(q);
          const matchCategory = service.category?.name.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTags && !matchCategory) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "newest") {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        // Recommended: featured first, then displayOrder
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.displayOrder - b.displayOrder;
      });
  }, [
    initialServices,
    searchQuery,
    selectedCategory,
    selectedPricingType,
    sortBy,
    featuredOnly,
  ]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedPricingType !== "all" ||
    featuredOnly ||
    sortBy !== "recommended";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPricingType("all");
    setSortBy("recommended");
    setFeaturedOnly(false);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls Bar */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle space-y-4 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services by keyword, feature, or tag..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by category"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort services"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

            {/* Quick Category Chips & Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-sm scale-105"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:scale-[1.02]"
                }`}
              >
                All Packages
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                    selectedCategory === cat.slug
                      ? "bg-gradient-to-r from-brand-royal to-brand-violet text-white shadow-sm scale-105"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:scale-[1.02]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none hover:text-brand-violet transition-colors">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-violet focus:ring-brand-violet border-slate-300 dark:border-slate-700"
                />
                <span className="inline-flex items-center gap-1.5">
                  <span>Popular Only</span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline ml-2 transition-all active:scale-95 inline-flex items-center gap-1"
                >
                  <span>Reset Filters</span>
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Showing <span className="text-brand-navy dark:text-white font-bold">{filteredServices.length}</span>{" "}
          {filteredServices.length === 1 ? "package" : "packages"}
        </p>
      </div>

      {/* Grid of Services */}
      {filteredServices.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3 transition-colors">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-navy dark:text-white">No matching packages found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn&apos;t find any service matching your current filters. Try changing your search query or reset the filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 px-4 py-2 bg-brand-navy dark:bg-brand-royal text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredServices.map((service, index) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={index * 100} className="h-full flex flex-col">
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
