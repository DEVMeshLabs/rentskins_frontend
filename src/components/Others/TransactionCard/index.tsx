import { TransactionButton } from './TransactionButton'
import { TransactionActions } from './TransactionActions'
import { TransactionContent } from './TransactionContent'
import { TransactionImage } from './TransactionImage'
import { TransactionLabel } from './TransactionLabel'
import { TransactionSkeleton } from './TransactionSkeleton'
import TransactionRoot from './TransactionRoot'
import { TransactionTableSkeleton } from './TransactionTableSkeleton'

const TransactionCard = {
  Root: TransactionRoot,
  Image: TransactionImage,
  Label: TransactionLabel,
  Content: TransactionContent,
  Actions: TransactionActions,
  Button: TransactionButton,
  Skeleton: TransactionSkeleton,
  SkeletonTable: TransactionTableSkeleton,
}

export default TransactionCard
