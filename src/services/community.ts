import { communityArtsCollection } from "@/constants/collections";
import { auth, db } from "@/firebase";
import { ICommunityArt } from "@/interfaces/art";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";

const getRecommendationsCommunityArts = async () => {
	try {
		const snap = await getDocs(
			query(
				collection(db, communityArtsCollection),
				orderBy("likes", "desc"),
				limit(10)
			)
		);

		const data = snap.docs.map((doc) => doc.data() as ICommunityArt);

		return {
			data,
			message: "Recomendaciones de la comunidad obtenidas.",
			error: false,
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			data: [],
			message: "Error al obtener las recomendaciones de la comunidad.",
		};
	}
};

const publishArt = async (art: ICommunityArt) => {
	try {
		if (!auth.currentUser)
			return {
				error: true,
				message: "No has iniciado sesión.",
			};

		const docRef = doc(db, communityArtsCollection, art.communityArtId);
		await setDoc(docRef, art);

		return {
			error: false,
			message: "Arte publicada con éxito.",
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al publicar la recomendación.",
		};
	}
};

const getMyArts = async () => {
	try {
		if (!auth.currentUser) {
			return {
				error: false,
				data: [],
				message: "No has iniciado sesión.",
			};
		}

		const snap = await getDocs(
			query(
				collection(db, communityArtsCollection),
				where("uid", "==", auth.currentUser.uid)
			)
		);

		const data = snap.docs.map((doc) => doc.data().communityArtId as string);

		return {
			data,
			message: "Artes obtenidas.",
			error: false,
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			data: [],
			message: "Error al obtener las artes publicadas.",
		};
	}
};

const unpublishArt = async (artId: string) => {
	try {
		await deleteDoc(doc(db, communityArtsCollection, artId));

		return {
			error: false,
			message: "Arte eliminada.",
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al eliminar la arte.",
		};
	}
};

const updateLikeArt = async (artId: string, action: "like" | "unlike") => {
	try {
		const docRef = doc(db, communityArtsCollection, artId);
		await updateDoc(docRef, { likes: increment(action == "like" ? 1 : -1) });

		return {
			error: false,
			message: "Arte recomendada.",
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al recomendar la arte.",
		};
	}
};

export {
	getRecommendationsCommunityArts,
	publishArt,
	getMyArts,
	unpublishArt,
	updateLikeArt,
};
