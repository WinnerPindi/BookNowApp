import { ValidatorService } from "../services/form-validators";


const VALIDATORS = {
  nom: (value) => {
   return  ValidatorService.min(value,3) || ValidatorService.max(value,20);
  },
  prenom: (value) => {
    return  ValidatorService.min(value,3) || ValidatorService.max(value,20);
   },
  
};



export function SingUp({nom, prenom, email}) {
  return (
    <div>
      <div className="mt-20">
        <h1 className="text-4xl text-center mb-4">Inscription</h1>
        <form className="max-w-xl mx-auto ">
        <input type="text" placeholder="Entrez votre nom" />
        <input type="text" placeholder="Entrez votre prénom" />
          <input type="email" placeholder="Entrez votre adresse mail"/>
          <input type="password" placeholder="Mot de passe " />
          <input type="password" placeholder="Confirmer le mot de passe " />
          <button className="primary">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
