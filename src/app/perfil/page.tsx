'use client'
import ChoiceItems from '@/components/Others/ChoiceItems'
import PerfilPerson from '@/components/Others/ProfilePerson'
// import AllSkins from '@/components/Skins/AllSkins'
// import RentedSkins from '@/components/Skins/RentedSkins'
// import useComponentStore from '@/stores/components.store'

export default function Perfil() {
  // const { profileTabValue } = useComponentStore()

  return (
    <main className="mx-auto flex w-4/5 flex-col items-center py-7">
      <PerfilPerson />
      <ChoiceItems thereIsRented={true} />
      {/* {profileTabValue === 'sales' ? (
          // <AllSkins itemsPerPage={15} />
        ) : (
          <RentedSkins />
        )} */}
    </main>
  )
}
