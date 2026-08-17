/**
 * Ambika Traders — Data Relationship Query Utilities
 * Provides bi-directional lookup helpers for products, services, and projects.
 */

import { products } from './products';
import { services } from './services';
import { projects } from './projects';
import { productCategories } from './productCategories';

/**
 * Get product by slug or id
 */
export function getProductByIdOrSlug(identifier) {
  if (!identifier) return null;
  return products.find(p => p.id === identifier || p.slug === identifier) || null;
}

/**
 * Get category by slug or id
 */
export function getCategoryByIdOrSlug(identifier) {
  if (!identifier) return null;
  return productCategories.find(c => c.id === identifier || c.slug === identifier) || null;
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryIdOrSlug) {
  const category = getCategoryByIdOrSlug(categoryIdOrSlug);
  if (!category) return [];
  return products.filter(p => p.categoryId === category.id);
}

/**
 * Get service by slug or id
 */
export function getServiceByIdOrSlug(identifier) {
  if (!identifier) return null;
  return services.find(s => s.id === identifier || s.slug === identifier) || null;
}

/**
 * Get project by slug or id
 */
export function getProjectByIdOrSlug(identifier) {
  if (!identifier) return null;
  return projects.find(p => p.id === identifier || p.slug === identifier) || null;
}

/**
 * Given a product, get its related services
 */
export function getRelatedServicesForProduct(productIdOrSlug) {
  const product = getProductByIdOrSlug(productIdOrSlug);
  if (!product || !product.relatedServices) return [];
  return services.filter(s => product.relatedServices.includes(s.id));
}

/**
 * Given a product, get its related projects
 */
export function getRelatedProjectsForProduct(productIdOrSlug) {
  const product = getProductByIdOrSlug(productIdOrSlug);
  if (!product || !product.relatedProjects) return [];
  return projects.filter(p => product.relatedProjects.includes(p.id));
}

/**
 * Given a service, get its related products
 */
export function getRelatedProductsForService(serviceIdOrSlug) {
  const service = getServiceByIdOrSlug(serviceIdOrSlug);
  if (!service || !service.relatedProducts) return [];
  return products.filter(p => service.relatedProducts.includes(p.id));
}

/**
 * Given a service, get its related projects
 */
export function getRelatedProjectsForService(serviceIdOrSlug) {
  const service = getServiceByIdOrSlug(serviceIdOrSlug);
  if (!service || !service.relatedProjects) return [];
  return projects.filter(p => service.relatedProjects.includes(p.id));
}

/**
 * Given a project, get its related products
 */
export function getRelatedProductsForProject(projectIdOrSlug) {
  const project = getProjectByIdOrSlug(projectIdOrSlug);
  if (!project || !project.relatedProducts) return [];
  return products.filter(p => project.relatedProducts.includes(p.id));
}

/**
 * Given a project, get its related services
 */
export function getRelatedServicesForProject(projectIdOrSlug) {
  const project = getProjectByIdOrSlug(projectIdOrSlug);
  if (!project || !project.relatedServices) return [];
  return services.filter(s => project.relatedServices.includes(s.id));
}
