type ISkeletonVariants = {
  variant: 'default'
  size: 'default' | 'md' | 'sm'
}

interface ISkeletonProps extends Partial<ISkeletonVariants> {
  className?: string
}

export type { ISkeletonProps, ISkeletonVariants }
