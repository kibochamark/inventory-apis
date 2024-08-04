import bcrypt from 'bcryptjs';

export async function createHash(pass:string){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);


    return {hashedPassword, salt}

}



export async function checkPassword(password:string, dbpass:string) {
    const isMatch = await bcrypt.compare(password, dbpass);


    return isMatch
}